import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import PokemonDetails from '../../pages/PokemonDetails/PokemonDetails';
import { vi } from 'vitest';

const mockContextValue = {
  name: 'Pikachu',
  description: 'An electric type Pokémon.',
  isLoading: false,
  handleCloseClick: vi.fn(),
};

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    useOutletContext: () => mockContextValue,
  };
});

const renderWithRouter = () => {
  return render(
    <MemoryRouter>
      <PokemonDetails />
    </MemoryRouter>
  );
};

describe('PokemonDetails', () => {
  it('renders the Pokemon details correctly', () => {
    renderWithRouter();

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('An electric type Pokémon.')).toBeInTheDocument();
  });

  it('shows the loader when isLoading is true', () => {
    vi.mock('react-router', async (importOriginal) => {
      const actual = await importOriginal<typeof import('react-router')>();
      return {
        ...actual,
        useOutletContext: () => ({ ...mockContextValue, isLoading: true }),
      };
    });
    renderWithRouter();

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('does not show the loader when isLoading is false', () => {
    renderWithRouter();

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });
});
