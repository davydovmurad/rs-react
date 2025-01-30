import { Component, ReactNode } from 'react';
import Search from '../Search/Search';
import styles from './Header.module.css';

export default class Header extends Component {
  render(): ReactNode {
    return (
      <div className={styles.container}>
        <Search />
      </div>
    );
  }
}
