import axios from 'axios';
import { logout } from '../helpers/authenticationHelper.js';

const BASE_URL = 'http://localhost:8080';

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
    }
  }
);

export { UnauthorizedService, AuthorizedService };
