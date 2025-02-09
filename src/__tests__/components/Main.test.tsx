import { render, screen } from '@testing-library/react';
import Main from '../../components/Main/Main';
import { PokemonsData } from '../../api';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('Main component', () => {
  const mockPokemonsData: PokemonsData = {
    count: 10,
    pokemons: [
      { name: 'Pikachu', description: 'Test description' },
      {
        name: 'Bulbasaur',
        description: 'Test description',
      },
    ],
  };

  it('renders error message when there is an error', () => {
    render(
      <BrowserRouter>
        <Main
          pokemonsData={mockPokemonsData}
          isLoading={false}
          error="Failed to fetch"
          page={1}
          onClick={vi.fn()}
        />
      </BrowserRouter>
    );
    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
  });
});
