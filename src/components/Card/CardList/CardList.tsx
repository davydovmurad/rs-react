import { Component, ReactNode } from 'react';
import Card from '../Card/Card';
import { Pokemon } from '../../../models';
import './CardList.module.css';

export default class CardList extends Component<{
  pokemons: Pokemon[];
}> {
  render(): ReactNode {
    if (this.props.pokemons.length === 0) {
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
          {this.props.pokemons.map((pokemon) => (
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
}
