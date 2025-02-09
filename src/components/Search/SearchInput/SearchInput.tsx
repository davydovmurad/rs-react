import { ComponentProps } from 'react';
import styles from './SearchInput.module.css';

export default function SearchInput(props: ComponentProps<'input'>) {
  return (
    <div className={styles.inputWrapper}>
      <input type="text" placeholder="Search" {...props} />
    </div>
  );
}
