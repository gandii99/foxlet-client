import axios, { AxiosRequestConfig } from 'axios';
import { string } from 'zod';
import { ClientType } from '../components/AssortmentPage/ClientsView';
import {
  BatchType,
  PalletCardType,
  ProductType,
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
interface CreateClient {
  id_user?: number;
  id_employee?: number;
  first_name?: string;
  last_name?: string;
  client_name?: string;
  NIP?: string;
  REGON?: string;
  phone?: string;
  email?: string;
  country?: string;
  province?: string;
  postal_code?: string;
  city?: string;
  street?: string;
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
  id_supplier: number;
  first_name: string;
  last_name: string;
  supplier_name?: string;
  NIP?: string;
  REGON?: string;
  phone?: string;
  email?: string;
  country: string;
  province: string;
  postal_code: string;
  city: string;
  street: string;
}

interface CreateSupplierType {
  first_name: string;
  last_name: string;
  supplier_name?: string;
  NIP?: string;
  REGON?: string;
  phone?: string;
  email?: string;
  country: string;
  province: string;
  postal_code: string;
  city: string;
  street: string;
}

export interface CategoryType {
  id_category: number;
  category_name: string;
  description: string;
}
export interface CreateCategoryType {
  id_category: number;
  category_name: string;
  description: string;
}

export interface CreatePalletType {
  id_supplier: number;
  // id_employee: number;
  purchase_price: number;
  purchase_date: string;
  delivery_date: string;
}

export interface OrderStatusType {
  id_order_status: number;
  id_status: number;
  id_order: number;
  id_employee: number;
  timestamp: string;
  comments: string;
}
export interface BatchOrderType {
  // id_supplier: number;
  id_batch: number;
  quantity_in_order: number;
  batch: BatchType;
  // id_employee: number;
  // batch_name: string;
  // purchase_price: number;
  // purchase_date: string;
  // delivery_date: string;
  // product: ProductType;
}

export interface CreateBatchType {
  id_product: number;
  id_condition: number;
  id_pallet?: number;
  batch_name?: string;
  quantity_in_delivery: number;
  quantity_in_stock: number;
  purchase_price?: number;
  selling_price: number;
  description?: string;
}

export interface OrderType {
  id_order: number;
  order_date: string;
  order_price: number;
  comments: string;
  batch_order: BatchOrderType[];
  order_status: OrderStatusType[];
  client: ClientType;
}

export interface BatchOrderTypeCreate {
  id_batch: number;
  // id_order: number;
  quantity_in_order: number;
}

export interface CreateOrderType {
  id_client: number;
  order_date: string;
  order_price: number;
  comments: string;
  batches: BatchOrderTypeCreate[];
}

export interface StatusType {
  id_status: number;
  status_name: string;
  description: string;
}
export interface updateStatusType {
  id_status: number;
  id_order: number;
  comments?: string;
}

const createSupplier = async (
  formData: CreateSupplierType,
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

const getAllProducts = async (): Promise<ProductType[]> => {
  const { data } = await api.get('/products');
  return data;
};

const getMyProducts = async (): Promise<ProductType[]> => {
  const { data } = await api.get('/products/my-products');
  return data;
};
const getMyBatches = async (): Promise<BatchType[]> => {
  const { data } = await api.get('/batches/my-batches');
  return data;
};

const getMybatchesSold = async (): Promise<BatchType[]> => {
  const { data } = await api.get('/batches/my-batches-sold');
  return data;
};

const getAllConditions = async () => {
  const result = await api.get('/conditions');
  return result;
};

const getMySuppliers = async (): Promise<SupplierType[]> => {
  const { data } = await api.get(`/suppliers/my-suppliers`);
  return data;
};
const createPallet = async (
  formData: CreatePalletType
  // onSucess?: VoidFunction,
  // onError?: (error: APIError) => void
) => {
  const result = api.post('/pallets', formData);
  return result;
};

const createClient = async (
  formData: CreateClient
  // onSucess?: VoidFunction,
  // onError?: (error: APIError) => void
) => {
  const result = api.post('/clients', formData);
  return result;
};

const getMyClients = async (): Promise<ClientType[]> =>
  // onSucess?: VoidFunction,
  // onError?: (error: APIError) => void
  {
    const { data } = await api.get('/clients/my-clients');
    return data;
  };

const createBatch = async (
  formData: CreateBatchType,
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

const createCategory = async (
  formData: CreateCategoryType,
  onSucess?: VoidFunction,
  onError?: (error: APIError) => void
) => {
  const result = api
    .post('/categories', formData)
    .then(respons => {
      console.log(respons);
      onSucess && onSucess();
    })
    .catch(error => {
      onError && onError(error);
    });
  return result;
};

const getAllCategories = async (): Promise<CategoryType[]> => {
  const { data } = await api.get(`/categories`);
  return data;
};

const getOrderStatus = async (orderId: number): Promise<StatusType> => {
  const { data } = await api.get(`/statuses/` + orderId);
  return data;
};
const getAllStatuses = async (): Promise<StatusType[]> => {
  const { data } = await api.get(`/statuses`);
  return data;
};

const updateStatus = async (
  data: updateStatusType,
  onSucess?: VoidFunction,
  onError?: (error: APIError) => void
) => {
  const result = api
    .post('/statuses', data)
    .then(respons => {
      console.log(respons);
      onSucess && onSucess();
    })
    .catch(error => {
      onError && onError(error);
    });
  return result;
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

const deleteSupplier = async (
  id_supplier: number,
  onSucess?: (url: string, message: string) => void,
  onError?: (error: APIError, url: string, message: string) => void
) => {
  const result = await api
    .delete(`/suppliers/my-suppliers/` + id_supplier)
    .then(respons => {
      console.log(respons);
      onSucess && onSucess('', 'Dostawca została usunięta.');
    })
    .catch(error => {
      onError && onError(error, '', 'Błąd podczas usuwania dostawcy.');
    });
  return result;
};

const deleteClient = async (
  id_client: number,
  onSucess?: (url: string, message: string) => void,
  onError?: (error: APIError, url: string, message: string) => void
) => {
  const result = await api
    .delete(`/clients/my-clients/` + id_client)
    .then(respons => {
      console.log(respons);
      onSucess && onSucess('', 'Klient została usunięta.');
    })
    .catch(error => {
      onError && onError(error, '', 'Błąd podczas usuwania klienta.');
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

const updatePallet = async (
  id_pallets: number,
  formData: UpadtePalletType,
  onSucess?: (message: string) => void,
  onError?: (error: APIError, message: string) => void
) => {
  console.log(formData);
  const result = api
    .patch(`/pallets/` + id_pallets, formData)
    .then(respons => {
      onSucess && onSucess('Paleta została zaktualizowana!');
    })
    .catch(error => {
      onError && onError(error, 'Błąd podczas aktualizowania palety!');
    });

  return result;
};

const createOrder = async (
  formData: CreateOrderType,
  onSucess?: VoidFunction,
  onError?: (error: APIError) => void
) => {
  const result = api
    .post('/orders', formData)
    .then(respons => {
      console.log(respons);
      onSucess && onSucess();
    })
    .catch(error => {
      onError && onError(error);
    });
  return result;
};

const getMyOrders = async (): Promise<OrderType[]> => {
  const { data } = await api.get(`/orders/my-orders`);
  return data;
};

const deleteOrder = async (
  id_order: number,
  onSucess?: VoidFunction,
  onError?: (error: APIError) => void
) => {
  console.log('usuwanko');
  const result = await api
    .delete(`/orders/` + id_order)
    .then(respons => {
      console.log(respons);
      onSucess && onSucess();
    })
    .catch(error => {
      onError && onError(error);
    });
  return result;
};

const assortmentAPI = {
  createSupplier,
  getAllSuppliers,
  getMySuppliers,
  getSelectedPalettes,
  deleteSupplier,

  createPallet,
  deletePallets,
  getMyPallets,
  updatePallet,

  getAllProducts,
  getMyProducts,
  getAllConditions,

  createBatch,
  getMyBatches,
  getMybatchesSold,
  deleteBatches,

  createClient,
  getMyClients,
  deleteClient,

  createCategory,
  getAllCategories,

  createOrder,
  getMyOrders,
  deleteOrder,

  getAllStatuses,
  getOrderStatus,
  updateStatus,
};

export default assortmentAPI;
