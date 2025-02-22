import { ChangeEvent, useContext, useState } from 'react';
import ThemeContext, { ThemeEnum } from '../../context/ThemeContext';
import { THEME_LOCAL_STORAGE_KEY } from '../../consts';
import styles from './ThemeSwitcher.module.css';

interface ThemeSwitcherProps {
  setTheme: React.Dispatch<React.SetStateAction<ThemeEnum | string>>;
}

export default function ThemeSwitcher({ setTheme }: ThemeSwitcherProps) {
  const theme = useContext(ThemeContext);
  const [checked, setChecked] = useState(theme === ThemeEnum.DARK);

  const onSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    const theme = newValue ? ThemeEnum.DARK : ThemeEnum.LIGHT;
    setChecked(newValue);
    setTheme(theme);
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme);
  };

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <input
        type="checkbox"
        id="themeSwitch"
        className={styles.themeSwitchInput}
        checked={checked}
        onChange={(e) => onSwitch(e)}
      />
      <label htmlFor="themeSwitch" className={styles.themeSwitchLabel}>
        <span>Switch theme</span>
      </label>
    </div>
  );
}
