import { Component, ComponentProps, ReactNode } from 'react';
import styles from './SearchInput.module.css';

export default class SearchInput extends Component<ComponentProps<'input'>> {
  render(): ReactNode {
    return (
      <div className={styles.inputWrapper}>
        <input type="text" placeholder="Search" {...this.props} />
      </div>
    );
  }
}
