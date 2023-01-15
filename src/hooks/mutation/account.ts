import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const useUpdateMyCompanyProfileMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(accountAPI.updateMyCompanyProfileData, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['my-company-profile']);
      onSuccess && onSuccess();
    },
  });
};

export const useCreateMyCompanyProfileMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(accountAPI.createCompany, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['my-company-profile']);
      onSuccess && onSuccess();
    },
  });
};
