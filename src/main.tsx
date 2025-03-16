import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './components/Home';
import FormUncontrolled from './components/FormUncontrolled';
import ReactHookForm from './components/ReactHookForm';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="form1" element={<FormUncontrolled />} />
          <Route path="form2" element={<ReactHookForm />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
