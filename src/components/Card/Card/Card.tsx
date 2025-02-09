import { ComponentProps } from 'react';
import styles from './Card.module.css';

type CardProps = {
  name: string;
  description: string;
};

export default function Card({
  name,
  description,
  onClick,
}: CardProps & ComponentProps<'tr'>) {
  return (
    <tr onClick={onClick}>
      <td className={styles.name}>{name}</td>
      <td>{description}</td>
    </tr>
  );
}
