import { NavigateFunction } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APIError } from './api/types';

const onSuccess = (
  message: string,
  url?: string,
  navigation?: NavigateFunction
) => {
  toast.success(message, {});
  if (url && navigation) {
    navigation(url);
  }
};

const onError = (error: APIError, message: string) => {
  toast.error(message);
};

export { onSuccess, onError };
