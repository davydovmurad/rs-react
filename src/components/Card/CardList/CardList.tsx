import Card from '../Card/Card';
import { Pokemon } from '../../../models';
import './CardList.css';
import Pagination from '../../../ui/Pagination/Pagination';
import { useNavigate } from 'react-router';
import { ComponentProps } from 'react';

type CardListProps = {
  total: number;
  pokemons: Pokemon[];
  page: number;
};

export default function CardList({
  total,
  pokemons,
  page,
  onClick,
}: CardListProps & ComponentProps<'thead'>) {
  const navigate = useNavigate();
  const handleCardClick = (
    _e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    details: number
  ): void => {
    navigate(`/details?page=${page}&details=${details}`, { replace: true });
  };

  if (pokemons.length === 0) {
    return <p>List of pokemons is empty</p>;
  }

  return (
    <>
      <table>
        <thead onClick={onClick}>
          <tr>
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
              onClick={(e) => handleCardClick(e, i + 1)}
            />
          ))}
        </tbody>
      </table>
      {total > 0 && <Pagination total={total} page={page} />}
    </>
  );
}
