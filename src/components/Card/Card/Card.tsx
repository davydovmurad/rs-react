import styles from './Card.module.css';

type CardProps = {
  name: string;
  description: string;
};

export default function Card({ name, description }: CardProps) {
  return (
    <tr>
      <td className={styles.name}>{name}</td>
      <td>{description}</td>
    </tr>
  );
}
