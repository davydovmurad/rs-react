import { SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useGetAllPokemonsQuery } from '../../../services/pokemon';
import Card from '../Card/Card';
import Pagination from '../../../ui/Pagination/Pagination';
import Loader from '../../../ui/Loader/Loader';
import { PAGINATION_LIMIT } from '../../../consts';
import { Pokemon } from '../../../models';
import styles from './CardList.module.css';

const PAGE_PARAM: string = 'page';

type CardListProps = {
  setDetailsPokemon: (value: SetStateAction<Pokemon | undefined>) => void;
};

export default function CardList({ setDetailsPokemon }: CardListProps) {
  const nameFilter = useSelector(
    (state: RootState) => state.pokemons.nameFilter
  );
  const navigate = useNavigate();
  const [offset, setOffset] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
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
    setDetailsPokemon(pokemon);
    navigate(`/details?page=${pageParam}&details=${details}`, {
      replace: true,
    });
  };

  useEffect(() => {
    if (pageParam <= 0) {
      searchParams.set(PAGE_PARAM, '1');
      setSearchParams(searchParams);
    } else {
      setOffset((pageParam - 1) * PAGINATION_LIMIT);
    }
  }, [pageParam, searchParams, setSearchParams]);

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
              <table>
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
