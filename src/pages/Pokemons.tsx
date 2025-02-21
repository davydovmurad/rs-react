import { useState } from 'react';
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import ErrorButton from '../components/ErrorButton';
import Header from '../components/Header/Header';
import BottomPanel from '../components/BottomPanel/BottomPanel';
import { RootState } from '../store/store';
import { Pokemon } from '../models';
import CardList from '../components/Card/CardList/CardList';

export default function Pokemons() {
  const selectedPokemons = useSelector(
    (state: RootState) => state.pokemons.list
  );
  const [detailsPokemon, setDetailsPokemon] = useState<Pokemon>();

  return (
    <>
      <Header />
      <CardList setDetailsPokemon={setDetailsPokemon} />
      {selectedPokemons.length > 0 && <BottomPanel />}
      <Outlet
        context={{
          name: detailsPokemon?.name || '',
          description: detailsPokemon?.description || '',
        }}
      />
      <ErrorButton />
    </>
  );
}
