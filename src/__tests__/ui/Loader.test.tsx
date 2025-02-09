import { render } from '@testing-library/react';
import Loader from '../../ui/Loader/Loader';

describe('Loader', () => {
  it('should render without crashing', () => {
    const { container } = render(<Loader />);
    expect(container).toBeInTheDocument();
  });

  it('should render a span element', () => {
    const { container } = render(<Loader />);
    const spanElement = container.querySelector('span');
    expect(spanElement).toBeInTheDocument();
  });
});
