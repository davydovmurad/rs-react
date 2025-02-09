import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../../components/Card/Card/Card';
import { vi } from 'vitest';

describe('Card Component', () => {
  const mockProps = {
    name: 'Test Name',
    description: 'Test Description',
    onClick: vi.fn(),
  };

  test('renders Card component with name and description', () => {
    render(<Card {...mockProps} />);

    expect(screen.getByText('Test Name')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('calls onClick when card is clicked', () => {
    render(<Card {...mockProps} />);

    fireEvent.click(screen.getByRole('row'));
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });
});
