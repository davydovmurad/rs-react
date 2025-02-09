import { Route, Routes } from 'react-router';
import Pokemons from './pages/Pokemons';
import NoFound from './pages/NotFound/NotFound';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Pokemons />} />
      <Route path="*" element={<NoFound />} />
    </Routes>
  );
}
