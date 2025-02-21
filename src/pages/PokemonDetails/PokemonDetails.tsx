import { useEffect } from 'react';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router';
import styles from './PokemonDetails.module.css';
import { Pokemon } from '../../models';

const PAGE_PARAM: string = 'page';

export default function PokemonDetails() {
  const { name, description } = useOutletContext<Pokemon>();
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
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <a onClick={handleCloseClick} className={styles.close}></a>
      <h2 className={styles.heading}>{name}</h2>
      <p>{description}</p>
    </div>
  );
}
