import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import BottomPanel from '../../components/BottomPanel/BottomPanel';
import { clear } from '../../store/pokemonSlice';
import { Store, UnknownAction } from '@reduxjs/toolkit';
import { vi } from 'vitest';

const mockStore = configureStore([]);
const initialState = {
  pokemons: {
    list: [
      { name: 'Pikachu', description: 'Electric type' },
      { name: 'Charmander', description: 'Fire type' },
    ],
  },
};

describe('BottomPanel', () => {
  let store:
    | MockStoreEnhanced<unknown, object>
    | Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = vi.fn();
  });

  test('renders the correct number of selected pokemons', () => {
    render(
      <Provider store={store}>
        <BottomPanel />
      </Provider>
    );

    expect(screen.getByText('2 pokemon(s) are selected')).toBeInTheDocument();
  });

  test('dispatches clear action when "Unselect all" button is clicked', () => {
    render(
      <Provider store={store}>
        <BottomPanel />
      </Provider>
    );

    fireEvent.click(screen.getByText('Unselect all'));
    expect(store.dispatch).toHaveBeenCalledWith(clear());
  });

  test('downloads CSV when "Download" button is clicked', () => {
    render(
      <Provider store={store}>
        <BottomPanel />
      </Provider>
    );

    const createObjectURLMock = vi.fn();
    const revokeObjectURLMock = vi.fn();
    global.URL.createObjectURL = createObjectURLMock;
    global.URL.revokeObjectURL = revokeObjectURLMock;

    const link = document.createElement('a');
    document.body.appendChild(link);
    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    const removeChildSpy = vi.spyOn(document.body, 'removeChild');

    fireEvent.click(screen.getByText('Download'));

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalled();

    document.body.removeChild(link);
  });
});
