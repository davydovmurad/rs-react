import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NoFound from '../../pages/NotFound/NotFound';

describe('NoFound Component', () => {
  it('should render the 404 heading', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NoFound />
      </MemoryRouter>
    );
    expect(getByText('404')).toBeInTheDocument();
  });

  it('should render the description', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NoFound />
      </MemoryRouter>
    );
    expect(
      getByText("Oops! Looks like you're lost in the wild!")
    ).toBeInTheDocument();
  });

  it('should render the Pikachu image', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <NoFound />
      </MemoryRouter>
    );
    expect(getByAltText('Pikachu')).toBeInTheDocument();
  });

  it('should render the Go Back Home link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NoFound />
      </MemoryRouter>
    );
    expect(getByText('Go Back Home')).toBeInTheDocument();
  });
});
