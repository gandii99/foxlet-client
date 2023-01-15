import { useQuery } from '@tanstack/react-query';
import assortmentAPI from '../../services/assortment';

export const useGetPalletQuery = (id_pallets: number[]) => {
  return useQuery(
    ['pallet'],
    () => assortmentAPI.getSelectedPalettes(id_pallets),
    { enabled: id_pallets.length > 0 }
  );
};
