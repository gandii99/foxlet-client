import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { APIError } from '../../lib/api/types';
import accountAPI from '../../services/account';

export const useUpdateMyUserProfileMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(accountAPI.updateMyUserProfileData, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['my-user-profile']);
      onSuccess && onSuccess();
    },
  });
};

export const useUpdateMyEmployeeProfileMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(accountAPI.updateMyEmployeeProfileData, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['my-employee-profile']);
      onSuccess && onSuccess();
    },
  });
};

export const useCreateEmployeeProfileMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(accountAPI.createEmployeeProfile, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['my-employee-profile']);
      onSuccess && onSuccess();
    },
  });
};

export const useUpdateMyCompanyMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(accountAPI.updateMyCompany, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['my-company']);
      onSuccess && onSuccess();
    },
  });
};

export const useDeleteMyCompanyMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(accountAPI.deleteMyCompany, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['my-company']);
      onSuccess && onSuccess();
    },
  });
};

export const useSwitchMyCompanyMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(accountAPI.switchMyCompany, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['my-company']);
      onSuccess && onSuccess();
    },
  });
};

export const useCreateMyCompanyMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(accountAPI.createCompany, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['my-company']);
      onSuccess && onSuccess();
    },
  });
};
