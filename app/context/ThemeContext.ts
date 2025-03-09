import { createContext } from 'react';

export const enum ThemeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

const ThemeContext = createContext<ThemeEnum | string>(ThemeEnum.LIGHT);

export default ThemeContext;
