import axios, { AxiosRequestConfig } from 'axios';
import { useAuth } from '../hooks/use-auth';
import api from '../lib/api';
import { getLocalStorage } from '../lib/localStorage';
import { RegisterInputType, CredentialsType } from '../types/authTypes';

interface CreateEmployee {
  first_name: string;
  last_name: string;
  company_name: string;
  NIP: string;
  REGON: string;
  phone: string;
  email: string;
  country: string;
  province: string;
  postal_code: string;
  city: string;
  street: string;
}

const createUser = async (formData: CreateEmployee) => {
  const result = await api.post('/users', formData);
  return result;
};

const getAllUsers = async () => {
  const result = await api.get('/users');
  return result;
};
const getSelectedUsers = async (ids: number[]) => {
  const result = await api.get(`/users/?id=${ids.join(',')}`);
  return result;
};
const createEmployee = async (formData: CreateEmployee) => {
  const result = await api.post('/employees', formData);
  return result;
};

const getAllEmployees = async () => {
  const result = await api.get('/employees');
  return result;
};
const getMyCompany = async () => {
  const result = await api.get(`/companies/my-company-profile`);
  return result;
};
const getMyEmployeeProfile = async () => {
  const result = await api.get(`/employees/my-employee-profile`);
  return result;
};

const accountAPI = {
  createUser,
  getAllUsers,
  getSelectedUsers,
  createEmployee,
  getAllEmployees,
  getMyEmployeeProfile,
  getMyCompany,
};

export default accountAPI;