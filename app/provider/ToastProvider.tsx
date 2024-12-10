'use client';

import { Slide, ToastContainer } from 'react-toastify';

export default function ToastProvider() {
  return (
    <ToastContainer transition={Slide} position="bottom-right"/>
  );
}