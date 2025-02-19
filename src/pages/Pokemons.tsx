import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router';
import ErrorButton from '../components/ErrorButton';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import BottomPanel from '../components/BottomPanel/BottomPanel';
import useSearchRequest from '../hooks/useSearchRequest';
import PokemonApiService, { PokemonsData } from '../api';
import { PAGINATION_LIMIT } from '../consts';
import { Pokemon } from '../models';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const PAGE_PARAM: string = 'page';
const DETAILS_PARAM: string = 'details';

export default function Pokemons() {
  const pokemons = useSelector((state: RootState) => state.pokemons.list);
  const [nameFilter, setNameFilter] = useSearchRequest();
  const [pokemonsData, setPokemonsData] = useState<PokemonsData>({
    count: 0,
    pokemons: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [detailsPokemon, setDetailsPokemon] = useState<Pokemon>();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get(PAGE_PARAM));
  const detailsParam = Number(searchParams.get(DETAILS_PARAM));
  const navigate = useNavigate();

  useEffect(() => {
    if (pageParam <= 0) {
      searchParams.set(PAGE_PARAM, '1');
      setSearchParams(searchParams);
    } else {
      setOffset((pageParam - 1) * PAGINATION_LIMIT);
    }
  }, [pageParam, searchParams, setSearchParams]);

  useEffect(() => {
    const fetchPokemons = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const pokemons = await new PokemonApiService().getPokemons(
          nameFilter,
          offset
        );
        setPokemonsData(pokemons || { count: 0, pokemons: [] });
        setIsLoading(false);
      } catch (error) {
        setError(String(error));
      }
    };

    fetchPokemons();
  }, [nameFilter, offset]);

  useEffect(() => {
    setDetailsPokemon(pokemonsData.pokemons[detailsParam - 1]);
  }, [pokemonsData, detailsParam]);

  const handleCloseClick = (): void => {
    navigate(`/?page=${pageParam}`, { replace: true });
  };

  return (
    <>
      <Header updateNameFilter={setNameFilter} onClick={handleCloseClick} />
      <Main
        pokemonsData={pokemonsData}
        isLoading={isLoading}
        error={error}
        page={pageParam}
        onClick={handleCloseClick}
      />
      {pokemons.length > 0 && <BottomPanel />}
      <Outlet
        context={{
          name: detailsPokemon?.name || '',
          description: detailsPokemon?.description || '',
          isLoading: isLoading,
          handleCloseClick: handleCloseClick,
        }}
      />
      <ErrorButton />
    </>
  );
}
