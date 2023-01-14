import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import assortmentAPI, { CreatePalletType } from '../../services/assortment';

export const useCreatePalletsMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(assortmentAPI.createPallet, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['my-pallets']);
      onSuccess && onSuccess();
    },
  });
};
