import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchButton from '../../components/Search/SearchButton/SearchButton';
import { vi } from 'vitest';

describe('SearchButton', () => {
  it('renders the button with the correct text', () => {
    render(<SearchButton />);
    const buttonElement = screen.getByRole('button', { name: /search/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('passes props to the button element', () => {
    render(<SearchButton disabled={true} />);
    const buttonElement = screen.getByRole('button', { name: /search/i });
    expect(buttonElement).toBeDisabled();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<SearchButton onClick={handleClick} />);
    const buttonElement = screen.getByRole('button', { name: /search/i });
    await userEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
