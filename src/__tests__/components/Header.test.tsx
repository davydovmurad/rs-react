import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Header from '../../components/Header/Header';
import useSearchRequest from '../../hooks/useSearchRequest';
import { MockedFunction, vi } from 'vitest';

vi.mock('../../hooks/useSearchRequest');

const mockStore = configureStore([]);
const mockUseSearchRequest = useSearchRequest as MockedFunction<
  typeof useSearchRequest
>;

describe('Header', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({});
    mockUseSearchRequest.mockReturnValue({
      searchRequest: '',
      setSearchRequest: vi.fn(),
    });
  });

  it('renders the Header component', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Pikachu' } });

    expect(input).toHaveValue('Pikachu');
  });
});
