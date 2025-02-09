import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Pagination from '../../ui/Pagination/Pagination';
import { MemoryRouter } from 'react-router-dom';

describe('Pagination Component', () => {
  it('renders pagination links correctly when on the first page', () => {
    render(
      <MemoryRouter>
        <Pagination total={30} page={1} />
      </MemoryRouter>
    );

    expect(screen.getByText('←')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('→')).toBeInTheDocument();
  });

  it('renders pagination links correctly when on the last page', () => {
    render(
      <MemoryRouter>
        <Pagination total={30} page={10} />
      </MemoryRouter>
    );

    expect(screen.getByText('←')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('11')).toBeInTheDocument();
    expect(screen.getByText('→')).toBeInTheDocument();
  });

  it('renders pagination links correctly when on a middle page', () => {
    render(
      <MemoryRouter>
        <Pagination total={30} page={5} />
      </MemoryRouter>
    );

    expect(screen.getByText('←')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('→')).toBeInTheDocument();
  });

  it('disables the previous button when on the first page', () => {
    render(
      <MemoryRouter>
        <Pagination total={30} page={1} />
      </MemoryRouter>
    );

    const prevButton = screen.getByText('←').closest('li');
    expect(prevButton).toHaveClass('_prev_81b0bf');
  });

  it('disables the next button when on the last page', () => {
    render(
      <MemoryRouter>
        <Pagination total={30} page={10} />
      </MemoryRouter>
    );

    const nextButton = screen.getByText('→').closest('li');
    expect(nextButton).toHaveClass('_next_81b0bf');
  });
});
