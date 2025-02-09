import { render, screen } from '@testing-library/react';
import Header from '../../components/Header/Header';
import { vi } from 'vitest';

describe('Header Component', () => {
  const updateNameFilterMock = vi.fn();
  const onClickMock = vi.fn();

  beforeEach(() => {
    render(
      <Header updateNameFilter={updateNameFilterMock} onClick={onClickMock} />
    );
  });

  test('renders the Search component', () => {
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
