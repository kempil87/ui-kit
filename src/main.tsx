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
      <ErrorBoundary>
        <App />
      </ErrorBoundary>

      <ToastProvider />
    </BrowserRouter>
  </React.StrictMode>
);

/**
 * Array.latest: Расширение прототипа Array с добавлением last [true] для последнего элемента
 *
 * <JSX>
 *    {[1, 2, 3, 4, 5].latest((item, index, last, array) => (
 *       <div className={cn({ 'class-for-last': last })}>{item}</div>
 *    ))}
 * <JSX>
 *
 * **/

declare global {
  interface Array<T> {
    latest<U>(
      callback: (item: T, index: number, last: boolean, array: T[]) => U
    ): U[];
  }
}

Array.prototype.latest = function <T, U>(
  callback: (item: T, index: number, last: boolean, array: T[]) => U
): U[] {
  const result: U[] = [];

  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, i === this.length - 1, this));
  }

  return result;
};
