import { useContext, useEffect } from 'react';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router';
import ThemeContext from '../../context/ThemeContext';
import { Pokemon } from '../../models';
import styles from './PokemonDetails.module.css';

const PAGE_PARAM: string = 'page';

export default function PokemonDetails() {
  const { name, description } = useOutletContext<Pokemon>();
  const theme = useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  const pageParam = Number(searchParams.get(PAGE_PARAM));
  const navigate = useNavigate();

  const handleCloseClick = (): void => {
    navigate(`/?page=${pageParam}`, { replace: true });
  };

  useEffect(() => {
    document.body.addEventListener('click', handleCloseClick);

    return () => {
      document.body.removeEventListener('click', handleCloseClick);
    };
  });

  return (
    <div
      className={[styles.container, styles[theme]].join(' ')}
      onClick={(e) => e.stopPropagation()}
    >
      <a onClick={handleCloseClick} className={styles.close}></a>
      <h2 className={styles.heading}>{name}</h2>
      <p>{description}</p>
    </div>
  );
}
