import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/NotFound.module.css';

export default function NoFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>404</h1>
      <h2 className={styles.description}>
        Oops! Looks like you&apos;re lost in the wild!
      </h2>
      <Image
        className={styles.pokemon}
        src="/images/pikachu.png"
        alt="Pikachu"
        width={100}
        height={150}
      />
      <Link href="/" className={styles.button}>
        Go Back Home
      </Link>
    </div>
  );
}
