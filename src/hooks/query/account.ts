import { useQuery } from '@tanstack/react-query';
import accountAPI from '../../services/account';

export const useGetMyUserProfileQuery = () => {
  return useQuery(['my-user-profile'], accountAPI.getMyUserProfile);
};

export const useGetMyEmployeeProfileQuery = () => {
  return useQuery(['my-employee-profile'], accountAPI.getMyEmployeeProfile);
};

export const useGetMyCompanyProfileQuery = () => {
  return useQuery(['my-company-profile'], accountAPI.getMyCompanyProfile);
};
