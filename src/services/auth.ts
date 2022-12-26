import api from '../lib/api';
import { RegisterInputType, CredentialsType } from '../types/authTypes';

const login = async (credentials: CredentialsType) => {
  const result = await api.post('/auth/login', credentials);
  return result.data;
};

const register = async (registerData: RegisterInputType) => {
  const { data } = await api.post('/auth/register', registerData);
  return data;
};

const authAPI = {
  register,
  login,
};

export default authAPI;
