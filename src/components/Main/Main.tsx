import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import CardList from '../Card/CardList/CardList';
import PokemonApiService, { PokemonsData } from '../../api';
import Loader from '../../ui/Loader/Loader';
import styles from './Main.module.css';
import { PAGINATION_LIMIT } from '../../consts';

type MainProps = {
  nameFilter: string | null;
};

const PAGE_PARAM: string = 'page';

export default function Main({ nameFilter }: MainProps) {
  const [pokemonsData, setPokemonsData] = useState<PokemonsData>({
    count: 0,
    pokemons: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get(PAGE_PARAM));

  useEffect(() => {
    let offset: number = 0;

    if (pageParam <= 0) {
      searchParams.set(PAGE_PARAM, '1');
      setSearchParams(searchParams);
    } else {
      offset = (pageParam - 1) * PAGINATION_LIMIT;
    }

    const fetchPokemons = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const pokemons = await new PokemonApiService().getPokemons(
          nameFilter,
          offset
        );
        setPokemonsData(pokemons || { count: 0, pokemons: [] });
      } catch (error) {
        setError(String(error));
      }
      setIsLoading(false);
    };

    fetchPokemons();
  }, [nameFilter, pageParam, searchParams, setSearchParams]);

  return (
    <section className={styles.main}>
      {error && <p>Failed to fetch</p>}

      {!error &&
        (isLoading ? (
          <Loader />
        ) : (
          <CardList
            total={pokemonsData.count}
            pokemons={pokemonsData.pokemons}
            page={pageParam}
          />
        ))}
    </section>
  );
}
