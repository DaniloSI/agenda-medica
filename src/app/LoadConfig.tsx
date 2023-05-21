'use client';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import { setLocale } from 'yup';

setLocale({
  mixed: {
    required: 'Campo obrigatório',
  },
});

export default function LoadConfig() {
  return <ToastContainer />;
}
