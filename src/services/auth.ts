import api from '../lib/api';
import { APIError } from '../lib/api/types';
import { RegisterInputType, CredentialsType } from '../types/authTypes';

const login = async (
  credentials: CredentialsType,
  onSucess?: VoidFunction,
  onError?: (error: APIError) => void
) => {
  const result = await api.post('/auth/login', credentials);
  console.log();
  result.status === 200 && onSucess && onSucess();
  result.status !== 200 && onError && onError(result.request.error);
  return result.data;
};

const register = async (
  registerData: RegisterInputType,
  onSucess?: VoidFunction,
  onError?: (error: APIError) => void
) => {
  // const { data } = await api.post('/auth/register', registerData);
  let data = null;
  await api
    .post(`/auth/register`, registerData)
    .then(respons => {
      console.log(respons);
      data = respons.data;
      onSucess && onSucess();
    })
    .catch(error => {
      onError && onError(error);
    });

  // return result;
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
