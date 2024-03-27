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
  const newArray: U[] = [];

  let index = 0;

  for (const item of this) {
    const last = index === this.length - 1;

    newArray.push(callback(item, index, last, this));
    index++;
  }

  return newArray;
};
