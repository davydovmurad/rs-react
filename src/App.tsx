import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import ThemeContext, { ThemeEnum } from './context/ThemeContext';
import ThemeSwitcher from './ui/ThemeSwitcher/ThemeSwitcher';
import Pokemons from './pages/Pokemons';
import PokemonDetails from './pages/PokemonDetails/PokemonDetails';
import NoFound from './pages/NotFound/NotFound';
import { THEME_LOCAL_STORAGE_KEY } from './consts';
import './App.css';

export default function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem(THEME_LOCAL_STORAGE_KEY) || ThemeEnum.LIGHT
  );

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === ThemeEnum.LIGHT ? '#fef3c7' : '#a6a6a6';
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeSwitcher setTheme={setTheme} />

      <Routes>
        <Route path="/" element={<Pokemons />}>
          <Route path="details" element={<PokemonDetails />} />
        </Route>
        <Route path="*" element={<NoFound />} />
      </Routes>
    </ThemeContext.Provider>
  );
}
