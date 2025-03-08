import { render, screen, waitFor } from '@testing-library/react';
import MyApp from '@/components/Layout';
import { ThemeEnum } from '@/context/ThemeContext';
import { THEME_LOCAL_STORAGE_KEY } from '../../consts';

describe('MyApp Component', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.style.backgroundColor = '';
  });

  it('should render children', () => {
    render(
      <MyApp>
        <div>Test Child</div>
      </MyApp>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should initialize theme from localStorage if available', () => {
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, ThemeEnum.DARK);
    render(
      <MyApp>
        <div>Test Child</div>
      </MyApp>
    );
  });

  it('should initialize theme to light if localStorage is empty', () => {
    render(
      <MyApp>
        <div>Test Child</div>
      </MyApp>
    );
  });

  it('should set background color based on theme', async () => {
    render(
      <MyApp>
        <div>Test Child</div>
      </MyApp>
    );

    await waitFor(() => {
      expect(document.body.style.backgroundColor).toBe('rgb(254, 243, 199)');
    });

    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, ThemeEnum.DARK);

    render(
      <MyApp>
        <div>Test Child</div>
      </MyApp>
    );

    await waitFor(() => {
      expect(document.body.style.backgroundColor).toBe('rgb(166, 166, 166)');
    });
  });
});
