import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import assortmentAPI, { CreatePalletType } from '../../services/assortment';

export const useCreateBatchMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(assortmentAPI.createBatch, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['my-pallets']);
      await queryClient.invalidateQueries(['pallet']);
      onSuccess && onSuccess();
    },
  });
};
