'use client';
import { toast } from 'react-toastify'

export const showSuccessMessage = (message: string) => {
  toast.success(message);
}

export const showWarnMessage = (message: string) => {
  toast.warn(message)
}

export const showErrorMessage = (message: string) => {
  toast.error(message)
}
