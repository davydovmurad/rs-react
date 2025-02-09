import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../../components/Search/Search';
import { SEARCH_REQUEST_LOCAL_STORAGE_KEY } from '../../consts';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

describe('Search Component', () => {
  const updateNameFilterMock = vi.fn();

  beforeEach(() => {
    localStorage.clear();
  });

  it('should render SearchInput and SearchButton', () => {
    render(<Search updateNameFilter={updateNameFilterMock} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should update searchRequest state on input change', () => {
    render(<Search updateNameFilter={updateNameFilterMock} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });

  it('should call updateNameFilter and update localStorage on button click', () => {
    render(<Search updateNameFilter={updateNameFilterMock} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);

    expect(updateNameFilterMock).toHaveBeenCalledWith('test');
    expect(localStorage.getItem(SEARCH_REQUEST_LOCAL_STORAGE_KEY)).toBe('test');
  });

  it('should trim the searchRequest before updating localStorage and calling updateNameFilter', () => {
    render(<Search updateNameFilter={updateNameFilterMock} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: '  test  ' } });
    fireEvent.click(button);

    expect(updateNameFilterMock).toHaveBeenCalledWith('test');
    expect(localStorage.getItem(SEARCH_REQUEST_LOCAL_STORAGE_KEY)).toBe('test');
  });
});
