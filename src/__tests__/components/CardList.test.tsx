import { render, screen } from '@testing-library/react';
import CardList from '../../components/Card/CardList/CardList';
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

const mockPokemons = [
  { name: 'Pikachu', description: 'Electric mouse Pokémon' },
  { name: 'Bulbasaur', description: 'Seed Pokémon' },
];

describe('CardList Component', () => {
  it('renders a table with pokemon data when pokemons array is not empty', () => {
    render(
      <BrowserRouter>
        <CardList total={2} pokemons={mockPokemons} page={1} />
      </BrowserRouter>
    );
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Pokémon Name')).toBeInTheDocument();
    expect(screen.getByText('Desription')).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Electric mouse Pokémon')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Seed Pokémon')).toBeInTheDocument();
  });

  it('renders Pagination component when total is greater than 0', () => {
    render(
      <BrowserRouter>
        <CardList total={20} pokemons={mockPokemons} page={1} />
      </BrowserRouter>
    );
  });

  it('does not render Pagination component when total is 0', () => {
    render(
      <BrowserRouter>
        <CardList total={0} pokemons={mockPokemons} page={1} />
      </BrowserRouter>
    );
    const pagination = screen.queryByRole('navigation');
    expect(pagination).toBeNull();
  });
});
