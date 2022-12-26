import axios from 'axios';
const baseURL = 'http://localhost:5000';

const api = axios.create({
  baseURL: `${baseURL}/api`,
});

export default api;
