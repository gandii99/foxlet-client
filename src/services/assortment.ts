import axios, { AxiosRequestConfig } from 'axios';
import { PalletCardType } from '../components/AssortmentPage/PalletView/types';
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

interface CreatePalletType {
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

const getMySuppliers = async () => {
  const result = await api.get(`/suppliers/my-suppliers`);
  return result;
};

const createPallet = async (
  formData: CreatePalletType,
  onSucess?: VoidFunction,
  onError?: (error: APIError) => void
) => {
  const result = api
    .post(
      '/pallets',
      formData
      // {
      //   ...formData,
      //   id_supplier: parseInt(formData.id_supplier),
      // }
    )
    .then(respons => {
      console.log(respons);
      onSucess && onSucess();
    })
    .catch(error => {
      onError && onError(error);
    });
  return result;
};

const getMyPallets = async () => {
  const result = await api.get(`/pallets/my-pallets`);
  return result;
};

const getSelectedPalettes = async (id_pallets: number[]) => {
  const result = await api.get(`/pallets/` + id_pallets.join(','));
  return result;
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
  getMyPallets,
  updatePallet,
};

export default assortmentAPI;
