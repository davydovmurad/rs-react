import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import Pokemons from '../../pages/Pokemons';
import store from '../../store/store';

describe('Pokemons Page', () => {
  it('renders Header component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pokemons />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('does not render BottomPanel component when there are no selected pokemons', () => {
    store.dispatch({ type: 'pokemons/setList', payload: [] });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pokemons />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByTestId('bottom-panel')).not.toBeInTheDocument();
  });

  it('renders ErrorButton component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pokemons />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole('button', { name: /error/i })).toBeInTheDocument();
  });
});
