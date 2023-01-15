import axios, { AxiosRequestConfig } from 'axios';
import {
  BatchType,
  PalletCardType,
} from '../components/AssortmentPage/PalletView/types';
import { useAuth } from '../hooks/use-auth';
import api from '../lib/api';
import { APIError } from '../lib/api/types';
import { getLocalStorage } from '../lib/localStorage';
import { RegisterInputType, CredentialsType } from '../types/authTypes';

interface CreateEmployee {
  first_name: string;
  last_name: string;
  company_name: string;
  NIP: string;
  REGON: string;
  phone: string;
  email: string;
  country: string;
  province: string;
  postal_code: string;
  city: string;
  street: string;
}

interface UserType {
  email: string;
  password: string;
  user_name: string;
  role: string;
}

interface EmployeeType {
  first_name: string;
  last_name: string;
  PESEL: string;
  phone: string;
  email: string;
  country: string;
  province: string;
  postal_code: string;
  city: string;
  street: string;
}

interface SupplierType {
  first_name: string;
  last_name: string;
  supplier_name: string;
  NIP: string;
  REGON: string;
  phone: string;
  email: string;
  country: string;
  province: string;
  postal_code: string;
  city: string;
  street: string;
}

export interface CreatePalletType {
  id_supplier: number;
  // id_employee: number;
  purchase_price: number;
  purchase_date: string;
  delivery_date: string;
}

const createSupplier = async (
  formData: SupplierType,
  onSucess?: VoidFunction,
  onError?: (error: APIError) => void
) => {
  const result = api
    .post('/suppliers', formData)
    .then(respons => {
      console.log(respons);
      onSucess && onSucess();
    })
    .catch(error => {
      onError && onError(error);
    });
  return result;
};

const getAllSuppliers = async () => {
  const result = await api.get('/suppliers');
  return result;
};

const getAllProducts = async () => {
  const result = await api.get('/products');
  return result;
};

const getAllConditions = async () => {
  const result = await api.get('/conditions');
  return result;
};

const getMySuppliers = async () => {
  const result = await api.get(`/suppliers/my-suppliers`);
  return result;
};
const createPallet = async (
  formData: CreatePalletType
  // onSucess?: VoidFunction,
  // onError?: (error: APIError) => void
) => {
  const result = api.post('/pallets', formData);
  // .then(respons => {
  //   console.log(respons);
  //   onSucess && onSucess();
  // })
  // .catch(error => {
  //   onError && onError(error);
  // });
  return result;
};

const createBatch = async (
  formData: BatchType,
  onSucess?: VoidFunction,
  onError?: (error: APIError) => void
) => {
  console.log('createBatch');
  const result = api
    .post('/batches', formData)
    .then(respons => {
      console.log(respons);
      onSucess && onSucess();
    })
    .catch(error => {
      onError && onError(error);
    });
  return result;
};

const getMyPallets = async (): Promise<PalletCardType[]> => {
  const { data } = await api.get(`/pallets/my-pallets`);
  return data;
};

const deletePallets = async (
  id_pallets: number[],
  onSucess?: (url: string, message: string) => void,
  onError?: (error: APIError, url: string, message: string) => void
) => {
  const result = await api
    .delete(`/pallets/` + id_pallets.join(','))
    .then(respons => {
      console.log(respons);
      onSucess && onSucess('', 'Paleta została usunięta.');
    })
    .catch(error => {
      onError && onError(error, '', 'Błąd podczas usuwania palety.');
    });
  return result;
};

const deleteBatches = async (
  id_batches: number[],
  onSucess?: (url: string, message: string) => void,
  onError?: (error: APIError, url: string, message: string) => void
) => {
  console.log('usuwanko');
  const result = await api
    .delete(`/batches/` + id_batches.join(','))
    .then(respons => {
      console.log(respons);
      onSucess && onSucess('batches', 'Partia została usunięta.');
    })
    .catch(error => {
      onError && onError(error, 'batches', 'Błąd podczas usuwania partii.');
    });
  return result;
};

const getSelectedPalettes = async (
  id_pallets: number[]
): Promise<PalletCardType[]> => {
  const { data } = await api.get(`/pallets/` + id_pallets.join(','));
  return data;
};

interface UpadtePalletType {
  id_supplier?: number;
  pallet_name?: string;
  purchase_price?: number;
  purchase_date?: string;
  delivery_date?: string;
}

const updatePallet = async (id_pallets: number, formData: UpadtePalletType) => {
  console.log(formData);
  const result = await api.patch(`/pallets/` + id_pallets, formData);
  return result;
};

const assortmentAPI = {
  createSupplier,
  getAllSuppliers,
  getMySuppliers,
  getSelectedPalettes,

  createPallet,
  deletePallets,
  getMyPallets,
  updatePallet,

  getAllProducts,
  getAllConditions,

  createBatch,
  deleteBatches,
};

export default assortmentAPI;
