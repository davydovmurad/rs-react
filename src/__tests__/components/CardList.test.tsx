import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import setupStore from '../../store/store';
import CardList from '../../components/Card/CardList/CardList';
import { setupListeners } from '@reduxjs/toolkit/query';

const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
  useSearchParams: () => [new URLSearchParams({ page: '1' }), vi.fn()],
}));

describe('CardList', () => {
  const store = setupStore;
  setupListeners(store.dispatch);

  const mockSetDetailsPokemon = vi.fn();

  const renderCardList = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <CardList setDetailsPokemon={mockSetDetailsPokemon} />
        </BrowserRouter>
      </Provider>
    );
  };

  test('displays table headers correctly', async () => {
    renderCardList();
    const headers = ['Checkbox', 'Pokémon Name', 'Desription'];
    headers.forEach(async (header) => {
      const headerElement = await screen.findByText(header);
      expect(headerElement).toBeInTheDocument();
    });
  });

  test('displays error message on fetch failure', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(
      new Error('Failed to fetch')
    );
    renderCardList();
    const errorMessage = await screen.findByText('Failed to fetch');
    expect(errorMessage).toBeInTheDocument();
  });
});
