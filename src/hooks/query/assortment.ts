import { useQuery } from '@tanstack/react-query';
import assortmentAPI from '../../services/assortment';

export const useGetMyPalletsQuery = () => {
  return useQuery(['my-pallets'], assortmentAPI.getMyPallets);
};

export const useGetMySuppliersQuery = () => {
  return useQuery(['my-suppliers'], assortmentAPI.getMySuppliers);
};

export const useGetMyClientsQuery = () => {
  return useQuery(['my-clients'], assortmentAPI.getMyClients);
};

export const useGetMyOrdersQuery = () => {
  return useQuery(['my-orders'], assortmentAPI.getMyOrders);
};

export const useGetMyBatchesQuery = () => {
  return useQuery(['my-batches'], assortmentAPI.getMyBatches);
};

export const useGetMyBatchesSoldQuery = () => {
  return useQuery(['my-batches-sold'], assortmentAPI.getMybatchesSold);
};

export const useGetAllProductsQuery = () => {
  return useQuery(['all-products'], assortmentAPI.getAllProducts);
};

export const useGetMyProductsQuery = () => {
  return useQuery(['my-products'], assortmentAPI.getMyProducts);
};

// export const useGetStatusQuery = (id: number) => {
//   return useQuery(['my-status'], () => assortmentAPI.getOrderStatus(id));
// };
