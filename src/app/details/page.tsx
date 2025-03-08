'use client';

import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import { RootState } from '../../store/store';
import ThemeContext from '../../context/ThemeContext';
import PokemonsLayout from '../../components/PokemonsLayout';
import styles from '../../styles/PokemonDetails.module.css';

const PAGE_PARAM: string = 'page';

export default function PokemonDetails() {
  const { name, description } = useSelector(
    (state: RootState) => state.pokemons.detailsPokemon
  );
  const theme = useContext(ThemeContext);
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get(PAGE_PARAM));
  const router = useRouter();

  const handleCloseClick = (): void => {
    router.replace(`/?page=${pageParam}`);
  };

  useEffect(() => {
    document.body.addEventListener('click', handleCloseClick);

    return () => {
      document.body.removeEventListener('click', handleCloseClick);
    };
  });

  return (
    <PokemonsLayout>
      <div
        className={[styles.container, styles[theme]].join(' ')}
        onClick={(e) => e.stopPropagation()}
      >
        <a onClick={handleCloseClick} className={styles.close}></a>
        <h2 className={styles.heading}>{name}</h2>
        <p>{description}</p>
      </div>
    </PokemonsLayout>
  );
}
