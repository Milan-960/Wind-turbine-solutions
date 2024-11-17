import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import App from './App.tsx';
import { Header } from './component/index.ts';
import { MainLayout } from './layouts/MainLayout.tsx';
import ErrorBoundary from './utils/ErrorBoundary.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <MainLayout className="app">
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </MainLayout>
  </StrictMode>
);
