import { useOutletContext } from 'react-router';
import styles from './PokemonDetails.module.css';
import Loader from '../../ui/Loader/Loader';

type PokemonDetailsContext = {
  name: string;
  description: string;
  isLoading: boolean;
  handleCloseClick: () => void;
};

export default function PokemonDetails() {
  const { name, description, isLoading, handleCloseClick } =
    useOutletContext<PokemonDetailsContext>();

  return (
    <div className={styles.container}>
      <a onClick={handleCloseClick} className={styles.close}></a>
      {isLoading && <Loader />}
      <h2 className={styles.heading}>{name}</h2>
      <p>{description}</p>
    </div>
  );
}
