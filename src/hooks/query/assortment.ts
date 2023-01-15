import { useQuery } from '@tanstack/react-query';
import assortmentAPI from '../../services/assortment';

export const useGetMyPalletsQuery = () => {
  return useQuery(['my-pallets'], assortmentAPI.getMyPallets);
};