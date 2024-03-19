import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import '../public/styles/global/index.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './shared/components/toast/toast.tsx';
import ErrorBoundary from './shared/components/error-boundary/error-boundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary
        content={
          <div className='flex-center h-screen'>
            Error Boundary started work
          </div>
        }
      >
        <App />
      </ErrorBoundary>

      <ToastProvider />
    </BrowserRouter>
  </React.StrictMode>
);
