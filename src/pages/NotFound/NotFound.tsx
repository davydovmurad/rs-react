import { Link } from 'react-router';
import pikachuImage from '../../assets/images/pikachu.png';
import styles from './NotFound.module.css';

export default function NoFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>404</h1>
      <h2 className={styles.description}>
        Oops! Looks like you&apos;re lost in the wild!
      </h2>
      <img className={styles.pokemon} src={pikachuImage} alt="Pikachu" />
      <Link to="/" className={styles.button}>
        Go Back Home
      </Link>
    </div>
  );
}
