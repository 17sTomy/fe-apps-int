import axios from 'axios';
import { logout } from '../helpers/authenticationHelper.js';

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const getToken = () => {
  return localStorage.getItem('token');
};

const UnauthorizedService = axios.create({
  baseURL: BASE_URL,
});

const AuthorizedService = axios.create({
  baseURL: BASE_URL,
});

AuthorizedService.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

AuthorizedService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if ([401, 403].includes(error?.response?.status)) {
      logout();
      window.location.replace('/login?error=true');
    } else if ([400].includes(error?.response?.status)) {
      throw error?.response?.data;
    }
  }
);

export { UnauthorizedService, AuthorizedService };
