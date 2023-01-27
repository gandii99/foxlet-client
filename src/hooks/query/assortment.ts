import { useQuery } from '@tanstack/react-query';
import assortmentAPI from '../../services/assortment';

export const useGetMyPalletsQuery = () => {
  return useQuery(['my-pallets'], assortmentAPI.getMyPallets);
};

export const useGetMySuppliersQuery = () => {
  return useQuery(['my-suppliers'], assortmentAPI.getAllSuppliers);
};

export const useGetMyClientsQuery = () => {
  return useQuery(['my-clients'], assortmentAPI.getMyClients);
};

export const useGetMyOrdersQuery = () => {
  return useQuery(['my-orders'], assortmentAPI.getMyOrders);
};
