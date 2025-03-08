import { render, screen } from '@testing-library/react';
import Index from '../../pages/index';
import { vi } from 'vitest';
import store from '@/store/store';
import { Provider } from 'react-redux';
import ThemeContext from '@/context/ThemeContext';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue('1'),
  }),
  usePathname: vi.fn(),
}));

it('renders Pokemon details', () => {
  const { container } = render(
    <Provider store={store}>
      <ThemeContext.Provider value="light">
        <Index />
      </ThemeContext.Provider>
    </Provider>
  );

  expect(container.querySelector('header')).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});
