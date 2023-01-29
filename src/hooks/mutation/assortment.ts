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

export const useDeletePalletsMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(assortmentAPI.deletePallets, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['my-pallets']);
      onSuccess && onSuccess();
    },
  });
};

export const useCreateSupplierMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(assortmentAPI.createSupplier, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['my-suppliers']);
      onSuccess && onSuccess();
    },
  });
};

export const useDeleteSupplierMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(assortmentAPI.deleteSupplier, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['my-suppliers']);
      onSuccess && onSuccess();
    },
  });
};

export const useCreateClientMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(assortmentAPI.createClient, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['my-clients']);
      onSuccess && onSuccess();
    },
  });
};
export const useDeleteClientMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(assortmentAPI.deleteClient, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['my-clients']);
      onSuccess && onSuccess();
    },
  });
};

export const useDeleteOrderMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(assortmentAPI.deleteOrder, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['my-orders']);
      onSuccess && onSuccess();
    },
  });
};

export const useUpdateStatusMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(assortmentAPI.updateStatus, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['my-orders']);
      onSuccess && onSuccess();
    },
  });
};
