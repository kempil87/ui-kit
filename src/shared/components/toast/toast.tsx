import { Portal } from '../portal/portal.tsx';

type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  message: string;
  duration?: number /** ms **/;
  type?: ToastType;
}

export const ToastProvider = () => {
  return (
    <Portal>
      <div
        className='fixed pointer-events-none z-full flex-col gap-6 inset-x-0 flex items-center top-16'
        id='toast-container'
      />
    </Portal>
  );
};

class Toast {
  show({ message, type, duration }: ToastItem) {
    const container = document.querySelector('#toast-container');
    const toastWrap = document.createElement('div');
    const toastTitle = document.createElement('span');
    const toastMessage = document.createElement('p');
    const { title, borderColor, bgColor } = TOAST_TYPES[type || 'success'];

    toastWrap.style.borderColor = borderColor;
    toastWrap.style.background = bgColor;
    toastTitle.textContent = title;
    toastMessage.textContent = message;

    const toastClassName =
      'px-4 pointer-events-auto w-96 py-2 text-black rounded-md';
    toastWrap.className = `animate-enter ${toastClassName}`;

    toastWrap.appendChild(toastTitle);
    toastWrap.appendChild(toastMessage);

    if (!container) return;
    container.appendChild(toastWrap);

    setTimeout(() => {
      toastWrap.className = `animate-leave ${toastClassName}`;
    }, 2800);

    setTimeout(() => {
      container.removeChild(toastWrap);
    }, duration || 3000);
  }
}

export const toast = new Toast();

export const TOAST_TYPES = {
  error: {
    bgColor: '#fbeeeb',
    borderColor: '#eed0c6',
    icon: 'sr-error',
    iconColor: '#fc5758',
    title: 'Ошибка',
  },
  info: {
    bgColor: '#e7effa',
    borderColor: '#b4ccee',
    icon: 'sr-info',
    iconColor: '#3086eb',
    title: 'Инфо',
  },
  success: {
    bgColor: '#f1f9f5',
    borderColor: '#cee8d2',
    icon: 'sr-success',
    iconColor: '#50dc6c',
    title: 'Успешно',
  },
  warning: {
    bgColor: '#fff9eb',
    borderColor: '#f4e0b9',
    icon: 'sr-warning',
    iconColor: '#ffc122',
    title: 'Предупреждение',
  },
};
