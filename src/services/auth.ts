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

const refreshMyUserProfileData = async () => {
  const { data } = await api.get('/users/my-user-profile');
  return data;
};

const authAPI = {
  register,
  login,
  refreshMyUserProfileData,
};

export default authAPI;
