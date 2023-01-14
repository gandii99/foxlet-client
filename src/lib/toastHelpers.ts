import { toast } from 'react-toastify';
import { APIError } from './api/types';

const onSuccess = () => {
  // navigation('/assortment/pallets/' + id_palletProps);
  toast.success('Partia została dodana.', {});
};

const onError = (error: APIError) => {
  toast.error('Dodanie partii nie powiodło się!');
};

export { onSuccess, onError };
