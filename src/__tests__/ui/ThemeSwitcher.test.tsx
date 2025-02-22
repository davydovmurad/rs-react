import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ThemeSwitcher from '../../ui/ThemeSwitcher/ThemeSwitcher';
import ThemeContext, { ThemeEnum } from '../../context/ThemeContext';

const mockSetTheme = vi.fn();
const mockLocalStorageSetItem = vi.spyOn(Storage.prototype, 'setItem');

const renderWithContext = (initialTheme: ThemeEnum) => {
  return render(
    <ThemeContext.Provider value={initialTheme}>
      <ThemeSwitcher setTheme={mockSetTheme} />
    </ThemeContext.Provider>
  );
};

describe('ThemeSwitcher', () => {
  it('should render the switcher and display the correct initial theme', () => {
    renderWithContext(ThemeEnum.LIGHT);

    const switchInput = screen.getByRole('checkbox');
    expect(switchInput).toBeInTheDocument();
    expect(switchInput).not.toBeChecked();
  });

  it('should render the switcher and display the correct initial theme when DARK', () => {
    renderWithContext(ThemeEnum.DARK);

    const switchInput = screen.getByRole('checkbox');
    expect(switchInput).toBeInTheDocument();
    expect(switchInput).toBeChecked();
  });

  it('should switch to DARK theme and update context and localStorage', () => {
    renderWithContext(ThemeEnum.LIGHT);

    const switchInput = screen.getByRole('checkbox');

    fireEvent.click(switchInput);

    expect(mockSetTheme).toHaveBeenCalledWith(ThemeEnum.DARK);
    expect(mockLocalStorageSetItem).toHaveBeenCalledWith(
      'theme',
      ThemeEnum.DARK
    );
  });

  it('should switch to LIGHT theme and update context and localStorage', () => {
    renderWithContext(ThemeEnum.DARK);

    const switchInput = screen.getByRole('checkbox');

    fireEvent.click(switchInput);

    expect(mockSetTheme).toHaveBeenCalledWith(ThemeEnum.LIGHT);
    expect(mockLocalStorageSetItem).toHaveBeenCalledWith(
      'theme',
      ThemeEnum.LIGHT
    );
  });
});
