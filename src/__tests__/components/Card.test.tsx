import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Card from '../../components/Card/Card/Card';
import { vi } from 'vitest';
import { add, remove } from '../../store/pokemonSlice';

const mockStore = configureStore([]);

describe('Card Component', () => {
  const mockProps = {
    name: 'Test Name',
    description: 'Test Description',
    onClick: vi.fn(),
  };

  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      pokemons: {
        list: [],
      },
    });
    store.dispatch = vi.fn();
  });

  test('renders Card component with name and description', () => {
    render(
      <Provider store={store}>
        <Card {...mockProps} />
      </Provider>
    );

    expect(screen.getByText('Test Name')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('calls onClick when card is clicked', () => {
    render(
      <Provider store={store}>
        <Card {...mockProps} />
      </Provider>
    );

    fireEvent.click(screen.getByRole('row'));
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  test('dispatches add action when checkbox is checked', () => {
    render(
      <Provider store={store}>
        <Card {...mockProps} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    fireEvent.change(checkbox, { target: { checked: true } });

    expect(store.dispatch).toHaveBeenCalledWith(
      add({ name: 'Test Name', description: 'Test Description' })
    );
  });

  test('dispatches remove action when checkbox is unchecked', () => {
    store = mockStore({
      pokemons: {
        list: [{ name: 'Test Name', description: 'Test Description' }],
      },
    });
    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <Card {...mockProps} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    fireEvent.change(checkbox, { target: { checked: false } });

    expect(store.dispatch).toHaveBeenCalledWith(
      remove({ name: 'Test Name', description: 'Test Description' })
    );
  });
});
