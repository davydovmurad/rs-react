import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Pagination from '../../ui/Pagination/Pagination';
import { MemoryRouter } from 'react-router';
import { PAGINATION_LIMIT } from '../../consts';

describe('Pagination', () => {
  const renderWithRouter = (total: number, page: number) => {
    return render(
      <MemoryRouter>
        <Pagination total={total} page={page} />
      </MemoryRouter>
    );
  };

  it('should render first page correctly', () => {
    renderWithRouter(30, 1);

    expect(screen.getByText('1')).toHaveClass(/_link/);
    expect(screen.getByText('←').closest('li')).toHaveClass(/_disabled/);
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
  });

  it('should render middle page correctly', () => {
    renderWithRouter(50, 3);

    const pages = screen.getAllByRole('listitem').slice(1, -1);
    expect(pages).toHaveLength(3);
    expect(pages[0]).toHaveTextContent('2');
    expect(pages[1]).toHaveTextContent('3');
    expect(pages[2]).toHaveTextContent('4');
  });

  it('should render last page correctly', () => {
    const total = 30;
    const lastPage = Math.ceil(total / PAGINATION_LIMIT);
    renderWithRouter(total, lastPage);

    expect(screen.getByText('→').closest('li')).toHaveClass(/_disabled/);
    expect(screen.getByText(String(lastPage))).toHaveClass(/_link/);
  });

  it('should have correct navigation links', () => {
    renderWithRouter(50, 2);

    expect(screen.getByText('←')).toHaveAttribute('href', '/?page=1');
    expect(screen.getByText('→')).toHaveAttribute(
      'href',
      `/?page=${Math.ceil(50 / PAGINATION_LIMIT)}`
    );
  });
});
