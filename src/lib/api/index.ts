import axios, { AxiosRequestConfig } from 'axios';
import { getLocalStorage } from '../localStorage';
const baseURL = 'http://localhost:5000';

const api = axios.create({
  baseURL: `${baseURL}/api`,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    // Inicjalizuj config.headers jako pusty obiekt, jeśli jest undefined
    config.headers = config.headers || {};

    // Pobierz token z pamięci podręcznej
    const token = getLocalStorage('token')?.token;

    // Dodaj token do nagłówka Authorization tylko dla żądań do określonego URL
    console.log('config.url', config.url);
    if (token && config.url !== '/auth') {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }
);

export default api;
