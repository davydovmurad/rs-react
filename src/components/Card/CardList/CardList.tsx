import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { usePathname, useSearchParams } from 'next/navigation';
import { RootState } from '@/store/store';
import { setDetailsPokemon } from '@/store/pokemonSlice';
import { useGetAllPokemonsQuery } from '@/services/pokemon';
import Pagination from '@/components/ui/Pagination/Pagination';
import Loader from '@/components/ui/Loader/Loader';
import Card from '../Card/Card';
import { PAGINATION_LIMIT } from '../../../consts';
import { Pokemon } from '../../../models';
import styles from './CardList.module.css';

const PAGE_PARAM: string = 'page';

export default function CardList() {
  const dispatch = useDispatch();
  const nameFilter = useSelector(
    (state: RootState) => state.pokemons.nameFilter
  );
  const router = useRouter();
  const pathname = usePathname();
  const [offset, setOffset] = useState<number>(0);
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get(PAGE_PARAM));
  const { data, error, isLoading, isFetching } = useGetAllPokemonsQuery({
    nameFilter: nameFilter,
    offset: offset,
  });
  const pokemons = data?.pokemons || [];
  const total = data?.count || 0;

  const handleCardClick = (
    _e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    details: number,
    pokemon: Pokemon
  ): void => {
    dispatch(setDetailsPokemon(pokemon));
    router.replace(`/details?page=${pageParam}&details=${details}`);
  };

  useEffect(() => {
    if (pageParam <= 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set(PAGE_PARAM, '1');
      router.push(pathname + '?' + params.toString());
    } else {
      setOffset((pageParam - 1) * PAGINATION_LIMIT);
    }
  }, [pageParam, pathname, router, searchParams]);

  if (error) {
    return <p className={styles.msg}>Failed to fetch</p>;
  }

  return (
    <section className={styles.cardList}>
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <>
          {pokemons.length === 0 ? (
            <p className={styles.msg}>List of pokemons is empty</p>
          ) : (
            <>
              <table className={styles.cardListTable}>
                <thead>
                  <tr>
                    <th>Checkbox</th>
                    <th>Pokémon Name</th>
                    <th>Desription</th>
                  </tr>
                </thead>
                <tbody>
                  {pokemons.map((pokemon, i) => (
                    <Card
                      key={pokemon.name}
                      name={pokemon.name}
                      description={pokemon.description}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(e, i + 1, pokemon);
                      }}
                    />
                  ))}
                </tbody>
              </table>
              {total > PAGINATION_LIMIT && (
                <Pagination total={total} page={pageParam} />
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}
