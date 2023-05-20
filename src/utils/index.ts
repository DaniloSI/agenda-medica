import { toast } from 'react-toastify';

export const formatDate = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions
): string =>
  new Intl.DateTimeFormat('pt-BR', options).format(
    typeof date === 'string' ? new Date(date) : date
  );

type ToastType = 'info' | 'success' | 'warning' | 'error';

export const notify = (type: ToastType, message: string) =>
  toast(message, {
    type,
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  });
