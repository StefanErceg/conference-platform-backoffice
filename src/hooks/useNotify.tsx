import { useTranslation } from 'react-i18next';
import { toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
    position: 'top-right',
    closeOnClick: true,
    autoClose: 4000,
};

export function useNotify() {
    const { t } = useTranslation();

    const success = (text: string, options: ToastOptions = defaultOptions) => {
        return toast.success(t(text), { ...defaultOptions, ...options });
    };
    const error = (text: string, options: ToastOptions = defaultOptions) => {
        return toast.error(t(text), { ...defaultOptions, ...options });
    };

    const warn = (text: string, options: ToastOptions = defaultOptions) => {
        return toast.warning(t(text), { ...defaultOptions, ...options });
    };

    const info = (text: string, options: ToastOptions = defaultOptions) => {
        return toast.info(t(text), { ...defaultOptions, ...options });
    };

    return { success, error, warn, info };
}
