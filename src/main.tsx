import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from './store/store.ts';

const container = document.getElementById('root');

if (!container) {
  throw new Error("Root element with ID 'root' was not found in the document");
}

createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);
