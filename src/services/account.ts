import axios, { AxiosRequestConfig } from 'axios';
import { typeUser } from '../components/AccountPage/UserForm';
import { useAuth } from '../hooks/use-auth';
import api from '../lib/api';
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

interface CompanyType {
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
  const result = await api.get('/users');
  return result;
};
const getSelectedUsers = async (ids: number[]) => {
  const result = await api.get(`/users/?id=${ids.join(',')}`);
  return result;
};
const createEmployeeProfile = async (formData: CreateEmployee) => {
  const result = await api.post('/employees', formData);
  return result;
};
const createCompany = async (formData: CreateCompany) => {
  const result = await api.post('/companies', formData);
  return result;
};

const getAllEmployees = async () => {
  const result = await api.get('/employees');
  return result;
};

const getAllCompanies = async () => {
  const { data } = await api.get('/companies');
  return data;
};

const getMyUserProfile = async (): Promise<UserType> => {
  const { data } = await api.get(`/users/my-user-profile`);
  return data;
};
const getMyCompanyProfile = async (): Promise<CompanyType> => {
  const { data } = await api.get(`/companies/my-company-profile`);
  return data;
};
const getMyEmployeeProfile = async (): Promise<EmployeeType> => {
  const { data } = await api.get(`/employees/my-employee-profile`);
  return data;
};
const updateMyUserProfileData = async (body: UpdateUserType) => {
  console.log('updateMyUserProfileData');
  const result = await api.patch(`/users/my-user-profile`, body);
  return result;
};
const updateMyEmployeeProfileData = async (body: EmployeeType) => {
  const result = await api.patch(`/employees/my-employee-profile`, body);
  return result;
};
const updateMyCompanyProfileData = async (body: CompanyType) => {
  const result = await api.patch(`/companies/my-company-profile`, body);
  return result;
};

const accountAPI = {
  // createUser,
  getAllUsers,
  getSelectedUsers,
  createEmployeeProfile,
  getAllEmployees,
  getMyEmployeeProfile,
  createCompany,
  getMyCompanyProfile,
  getMyUserProfile,
  updateMyUserProfileData,
  updateMyEmployeeProfileData,
  updateMyCompanyProfileData,
  getAllCompanies,
};

export default accountAPI;
