import { ReactNode, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import ErrorBoundary from './ErrorBoundary';
import ThemeContext, { ThemeEnum } from '@/context/ThemeContext';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher/ThemeSwitcher';
import { THEME_LOCAL_STORAGE_KEY } from '../consts';

export default function Layout({ children }: { children: ReactNode }) {
  let initTheme: ThemeEnum | string = ThemeEnum.LIGHT;

  if (typeof window !== 'undefined') {
    initTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY) || initTheme;
  }

  const [theme, setTheme] = useState(initTheme);

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === ThemeEnum.LIGHT ? '#fef3c7' : '#a6a6a6';
  }, [theme]);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeContext.Provider value={theme}>
          <ThemeSwitcher setTheme={setTheme} />
          {children}
        </ThemeContext.Provider>
      </Provider>
    </ErrorBoundary>
  );
}
