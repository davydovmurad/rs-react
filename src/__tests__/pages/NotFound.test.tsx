import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import NotFound from '../../pages/NotFound/NotFound';

describe('NotFound', () => {
  it('renders 404 heading', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    expect(
      screen.getByText("Oops! Looks like you're lost in the wild!")
    ).toBeInTheDocument();
  });

  it('renders Pikachu image', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    const image = screen.getByAltText('Pikachu');
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe('IMG');
  });

  it('renders home link', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    const link = screen.getByText('Go Back Home');
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/');
  });
});
