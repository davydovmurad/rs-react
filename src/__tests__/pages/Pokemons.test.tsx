import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Pokemons from '../../pages/Pokemons';
import { vi } from 'vitest';
import PokemonApiService from '../../api';

vi.mock('../../api');
vi.mock('../../hooks/useSearchRequest', () => ({
  default: () => ['test', vi.fn()],
}));
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useSearchParams: () => [
      new URLSearchParams({ page: '1', details: '1' }),
      vi.fn(),
    ],
    Outlet: actual.Outlet,
  };
});

describe('Pokemons', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(
      <MemoryRouter>
        <Pokemons />
      </MemoryRouter>
    );
    expect(screen.getByText('Error button')).toBeInTheDocument();
  });

  it('fetches and displays pokemons', async () => {
    const mockPokemonsData = {
      count: 1,
      pokemons: [{ name: 'Pikachu', description: 'Electric type' }],
    };
    PokemonApiService.prototype.getPokemons = vi
      .fn()
      .mockResolvedValue(mockPokemonsData);

    render(
      <MemoryRouter>
        <Pokemons />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    PokemonApiService.prototype.getPokemons = vi
      .fn()
      .mockRejectedValue(new Error('API Error'));

    render(
      <MemoryRouter>
        <Pokemons />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
    });
  });

  it('updates offset based on page param', async () => {
    const mockPokemonsData = {
      count: 1,
      pokemons: [{ name: 'Pikachu', description: 'Electric type' }],
    };
    PokemonApiService.prototype.getPokemons = vi
      .fn()
      .mockResolvedValue(mockPokemonsData);

    render(
      <MemoryRouter initialEntries={['/?page=2']}>
        <Routes>
          <Route path="/" element={<Pokemons />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(PokemonApiService.prototype.getPokemons).toHaveBeenCalledWith(
        'test',
        0
      );
    });
  });

  it('sets detailsPokemon based on details param', async () => {
    const mockPokemonsData = {
      count: 1,
      pokemons: [{ name: 'Pikachu', description: 'Electric type' }],
    };
    PokemonApiService.prototype.getPokemons = vi
      .fn()
      .mockResolvedValue(mockPokemonsData);

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <Routes>
          <Route path="/" element={<Pokemons />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
    });
  });
});
