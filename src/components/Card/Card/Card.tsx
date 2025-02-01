import { Component, ReactNode } from 'react';
import styles from './Card.module.css';

export default class Card extends Component<{
  name: string;
  description: string;
}> {
  render(): ReactNode {
    return (
      <tr>
        <td className={styles.name}>{this.props.name}</td>
        <td>{this.props.description}</td>
      </tr>
    );
  }
}
