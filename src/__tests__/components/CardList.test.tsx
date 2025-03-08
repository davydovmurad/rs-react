import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { usePathname, useSearchParams } from 'next/navigation';
import { vi, Mock } from 'vitest';
import configureStore from 'redux-mock-store';
import CardList from '@/components/Card/CardList/CardList';
import { RootState } from '@/store/store';
import { useGetAllPokemonsQuery } from '@/services/pokemon';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('../../services/pokemon', () => ({
  useGetAllPokemonsQuery: vi.fn(),
}));

const mockStore = configureStore([]);
const initialState: RootState = {
  pokemons: {
    list: [],
    nameFilter: '',
    detailsPokemon: { name: '', description: '' },
  },
  pokemonApi: {
    queries: {},
    mutations: {},
    provided: {},
    subscriptions: {},
    config: {
      reducerPath: 'pokemonApi',
      online: true,
      focused: true,
      middlewareRegistered: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
      keepUnusedDataFor: 60,
      invalidationBehavior: 'immediately',
    },
  },
};

describe('CardList', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
    (useRouter as Mock).mockReturnValue({
      push: vi.fn(),
      replace: vi.fn(),
    });
    (usePathname as Mock).mockReturnValue('/path');
    (useSearchParams as Mock).mockReturnValue(new URLSearchParams());
  });

  it('renders error state', () => {
    (useGetAllPokemonsQuery as Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
      isFetching: false,
    });

    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );

    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });

  it('renders empty state', () => {
    (useGetAllPokemonsQuery as Mock).mockReturnValue({
      data: { pokemons: [], count: 0 },
      error: null,
      isLoading: false,
      isFetching: false,
    });

    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );

    expect(screen.getByText(/list of pokemons is empty/i)).toBeInTheDocument();
  });

  it('renders list of pokemons', () => {
    const mockPokemons = [
      { name: 'Pikachu', description: 'Electric type' },
      { name: 'Charmander', description: 'Fire type' },
    ];

    (useGetAllPokemonsQuery as Mock).mockReturnValue({
      data: { pokemons: mockPokemons, count: mockPokemons.length },
      error: null,
      isLoading: false,
      isFetching: false,
    });

    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });

  it('handles card click', () => {
    const mockPokemons = [{ name: 'Pikachu', description: 'Electric type' }];

    (useGetAllPokemonsQuery as Mock).mockReturnValue({
      data: { pokemons: mockPokemons, count: mockPokemons.length },
      error: null,
      isLoading: false,
      isFetching: false,
    });

    const mockReplace = vi.fn();
    const mockPush = vi.fn();
    (useRouter as Mock).mockReturnValue({
      replace: mockReplace,
      push: mockPush,
    });

    render(
      <Provider store={store}>
        <CardList />
      </Provider>
    );

    fireEvent.click(screen.getByText(/pikachu/i));

    expect(mockReplace).toHaveBeenCalledWith('/details?page=0&details=1');
  });
});
