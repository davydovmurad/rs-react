import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '../../pages/404';

describe('NotFound', () => {
  it('renders 404 heading', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<NotFound />);
    expect(
      screen.getByText("Oops! Looks like you're lost in the wild!")
    ).toBeInTheDocument();
  });

  it('renders Pikachu image', () => {
    render(<NotFound />);
    const image = screen.getByAltText('Pikachu');
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe('IMG');
  });

  it('renders home link', () => {
    render(<NotFound />);
    const link = screen.getByText('Go Back Home');
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/');
  });
});
