import Card from '../Card/Card';
import { Pokemon } from '../../../models';
import './CardList.css';

type CardListProps = {
  pokemons: Pokemon[];
};

export default function CardList({ pokemons }: CardListProps) {
  if (pokemons.length === 0) {
    return <p>List of pokemons is empty</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Pokémon Name</th>
          <th>Desription</th>
        </tr>
      </thead>
      <tbody>
        {pokemons.map((pokemon) => (
          <Card
            key={pokemon.name}
            name={pokemon.name}
            description={pokemon.description}
          />
        ))}
      </tbody>
    </table>
  );
}
