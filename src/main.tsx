import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import App from './App.tsx';
import { MainLayout } from './layouts/MainLayout.tsx';
import { Header } from './component/index.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <MainLayout className="app">
      <App />
    </MainLayout>
  </StrictMode>
);
