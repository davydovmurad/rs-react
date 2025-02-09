import CardList from '../Card/CardList/CardList';
import { PokemonsData } from '../../api';
import Loader from '../../ui/Loader/Loader';
import styles from './Main.module.css';
import { ComponentProps } from 'react';

type MainProps = {
  pokemonsData: PokemonsData;
  isLoading: boolean;
  error: string | null;
  page: number;
};

export default function Main({
  pokemonsData,
  isLoading,
  error,
  page,
  onClick,
}: MainProps & ComponentProps<'section'>) {
  return (
    <section className={styles.main}>
      {error && <p>Failed to fetch</p>}

      {!error &&
        (isLoading ? (
          <Loader />
        ) : (
          <CardList
            total={pokemonsData.count}
            pokemons={pokemonsData.pokemons}
            page={page}
            onClick={onClick}
          />
        ))}
    </section>
  );
}
