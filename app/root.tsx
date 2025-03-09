import {
  isRouteErrorResponse,
  Links,
  Meta,
  Scripts,
  Outlet,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import { useEffect, useState } from 'react';
import { THEME_LOCAL_STORAGE_KEY } from './consts';
import ThemeContext, { ThemeEnum } from './context/ThemeContext';
import ThemeSwitcher from './ui/ThemeSwitcher/ThemeSwitcher';
import './App.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem(THEME_LOCAL_STORAGE_KEY) || ThemeEnum.LIGHT
  );

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === ThemeEnum.LIGHT ? '#fef3c7' : '#a6a6a6';
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeSwitcher setTheme={setTheme} />
      <Outlet />
    </ThemeContext.Provider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
