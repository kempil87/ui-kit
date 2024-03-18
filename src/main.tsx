import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import '../public/styles/global/index.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './shared/components/toast/toast.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />

      <ToastProvider />
    </BrowserRouter>
  </React.StrictMode>
);
