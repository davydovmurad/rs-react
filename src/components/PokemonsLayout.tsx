'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ErrorButton from '@/components/ErrorButton';
import Header from '@/components/Header/Header';
import BottomPanel from '@/components/BottomPanel/BottomPanel';
import CardList from '@/components/Card/CardList/CardList';

export default function PokemonsLayout({
  children = null,
}: {
  children: React.ReactNode | null;
}) {
  const selectedPokemons = useSelector(
    (state: RootState) => state.pokemons.list
  );

  return (
    <>
      <Header />
      <CardList />
      {selectedPokemons.length > 0 && <BottomPanel />}
      {children}
      <ErrorButton />
    </>
  );
}
