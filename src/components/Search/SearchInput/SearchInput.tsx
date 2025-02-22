import { ComponentProps, useContext } from 'react';
import ThemeContext from '../../../context/ThemeContext';
import styles from './SearchInput.module.css';

export default function SearchInput(props: ComponentProps<'input'>) {
  const theme = useContext(ThemeContext);

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        placeholder="Search"
        {...props}
        className={[styles.input, styles[theme]].join(' ')}
      />
    </div>
  );
}
