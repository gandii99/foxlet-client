import { toast } from 'react-toastify';
import { APIError } from './api/types';

const onSuccess = (message: string) => {
  toast.success(message, {});
};

const onError = (error: APIError, message: string) => {
  toast.error(message);
};

export { onSuccess, onError };
