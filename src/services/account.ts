import axios, { AxiosRequestConfig } from 'axios';
import { typeUser } from '../components/AccountPage/UserForm';
import { useAuth } from '../hooks/use-auth';
import api from '../lib/api';
import { APIError } from '../lib/api/types';
import { getLocalStorage } from '../lib/localStorage';
import { RegisterInputType, CredentialsType } from '../types/authTypes';

interface CreateEmployee {
  id_company?: number;
  first_name: string;
  last_name: string;
  PESEL: string;
  phone: string;
  email: string;
  country: string;
  province: string;
  postal_code: string;
  city: string;
  street: string;
}

interface UserType {
  email: string;
  password: string;
  user_name: string;
  role: string;
  avatar: string;
}
interface UpdateUserType {
  email?: string;
  password?: string;
  user_name?: string;
  role?: string;
  avatar?: string;
}

interface EmployeeType {
  id_company?: number;
  id_owner?: boolean;
  first_name?: string;
  last_name?: string;
  PESEL?: string;
  phone?: string;
  email?: string;
  country?: string;
  province?: string;
  postal_code?: string;
  city?: string;
  street?: string;
}

export interface CompanyType {
  id_company?: number;
  id_owner?: number;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  NIP?: string;
  REGON?: string;
  phone?: string;
  email?: string;
  country?: string;
  province?: string;
  postal_code?: string;
  city?: string;
  street?: string;
  employee?: EmployeeType[];
}

interface CreateCompany {
  first_name: string;
  last_name: string;
  company_name: string;
  NIP: string;
  REGON?: string;
  phone: string;
  email: string;
  country: string;
  province: string;
  postal_code: string;
  city: string;
  street: string;
}

// const createUser = async (formData: CreateUser) => {
//   const result = await api.post('/users', formData);
//   return result;
// };

const getAllUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};
const getSelectedUsers = async (ids: number[]) => {
  const { data } = await api.get(`/users/?id=${ids.join(',')}`);
  return data;
};
const createEmployeeProfile = async (formData: CreateEmployee) => {
  const { data } = await api.post('/employees', formData);
  return data;
};
const createCompany = async (formData: CreateCompany) => {
  const { data } = await api.post('/companies', formData);
  return data;
};

const getAllEmployees = async () => {
  const { data } = await api.get('/employees');
  return data;
};

const getAllCompanies = async () => {
  const { data } = await api.get('/companies');
  return data;
};

const getMyUserProfile = async (): Promise<UserType> => {
  const { data } = await api.get(`/users/my-user-profile`);
  return data;
};
const getMyCompany = async (): Promise<CompanyType> => {
  const { data } = await api.get(`/companies/my-company`);
  return data;
};
const getMyEmployeeProfile = async (): Promise<EmployeeType> => {
  const { data } = await api.get(`/employees/my-employee-profile`);
  return data;
};
const updateMyUserProfileData = async (body: UpdateUserType) => {
  console.log('updateMyUserProfileData');
  const { data } = await api.patch(`/users/my-user-profile`, body);
  return data;
};
const updateMyEmployeeProfileData = async (body: EmployeeType) => {
  const { data } = await api.patch(`/employees/my-employee-profile`, body);
  return data;
};

const updateMyCompany = async (body: CompanyType) => {
  const { data } = await api.patch(`/companies/my-company`, body);
  return data;
};

const deleteMyCompany = async () => {
  const { data } = await api.delete(`/companies/my-company`);
  return data;
};

const switchMyCompany = async (newCompanyId: number | null) => {
  const { data } = await api.patch(`/companies/switch-company`, {
    id_company: newCompanyId,
  });
  return data;
};

const accountAPI = {
  // createUser,
  getAllUsers,
  getSelectedUsers,
  createEmployeeProfile,
  getAllEmployees,
  getMyEmployeeProfile,
  createCompany,
  getMyCompany,
  getMyUserProfile,
  updateMyUserProfileData,
  updateMyEmployeeProfileData,
  updateMyCompany,
  deleteMyCompany,
  switchMyCompany,
  getAllCompanies,
};

export default accountAPI;
