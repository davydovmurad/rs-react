import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ErrorBoundary from '../../components/ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    const ThrowError = () => {
      throw new Error('Test Error');
    };

    vi.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(
      screen.getByText('The application crashed. Please try again later.')
    ).toBeInTheDocument();
    expect(console.log).toHaveBeenCalled();

    vi.restoreAllMocks();
  });
});
