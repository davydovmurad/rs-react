import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { Mock, vi } from 'vitest';
import store from '@/store/store';
import ThemeContext from '@/context/ThemeContext';
import PokemonDetails from '../../pages/details';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue('1'),
  }),
  usePathname: vi.fn(),
}));

describe('PokemonDetails Page', () => {
  const mockRouterReplace = vi.fn();

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({
      replace: mockRouterReplace,
    });
  });

  it('renders Pokemon details', () => {
    store.dispatch({
      type: 'pokemons/setDetailsPokemon',
      payload: { name: 'Pikachu', description: 'Electric type Pokemon' },
    });

    render(
      <Provider store={store}>
        <ThemeContext.Provider value="light">
          <PokemonDetails />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Electric type Pokemon')).toBeInTheDocument();
  });

  it('handles close click', () => {
    const { container } = render(
      <Provider store={store}>
        <ThemeContext.Provider value="light">
          <PokemonDetails />
        </ThemeContext.Provider>
      </Provider>
    );

    fireEvent.click(container.querySelector('a') as Element);
    expect(mockRouterReplace).toHaveBeenCalledWith('/?page=1');
  });

  it('applies theme class', () => {
    store.dispatch({
      type: 'pokemons/setDetailsPokemon',
      payload: { name: 'Pikachu', description: 'Electric type Pokemon' },
    });

    render(
      <Provider store={store}>
        <ThemeContext.Provider value="dark">
          <PokemonDetails />
        </ThemeContext.Provider>
      </Provider>
    );

    const container = screen.getByText('Pikachu').closest('div');
    expect(container).toHaveClass(/dark/);
  });

  it('adds and removes event listener on mount and unmount', () => {
    const addEventListenerSpy = vi.spyOn(document.body, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(
      document.body,
      'removeEventListener'
    );

    const { unmount } = render(
      <Provider store={store}>
        <ThemeContext.Provider value="light">
          <PokemonDetails />
        </ThemeContext.Provider>
      </Provider>
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'click',
      expect.any(Function)
    );
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'click',
      expect.any(Function)
    );
  });
});
