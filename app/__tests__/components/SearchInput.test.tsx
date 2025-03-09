import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from '../../components/Search/SearchInput/SearchInput';

describe('SearchInput', () => {
  it('renders the input element', () => {
    render(<SearchInput />);
    const inputElement = screen.getByPlaceholderText('Search');
    expect(inputElement).toBeInTheDocument();
  });

  it('accepts and displays input value', () => {
    render(<SearchInput />);
    const inputElement = screen.getByPlaceholderText('Search');
    userEvent.type(inputElement, 'test value');
    expect(inputElement).toHaveValue('');
  });

  it('applies additional props to the input element', () => {
    render(<SearchInput data-testid="search-input" />);
    const inputElement = screen.getByTestId('search-input');
    expect(inputElement).toBeInTheDocument();
  });
});
