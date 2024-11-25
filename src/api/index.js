import axios from 'axios';
import { logout } from '../helpers/authenticationHelper.js';
import store from '../store/store';
import { openSnackbar } from '../store/slice/uiSlice';
import { snackbarType } from '../hooks/useSnackbar';

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
    if (!error.response) {
      // Connection error
      store.dispatch(
        openSnackbar({
          message: 'Error de conexión. Por favor volvé a intentarlo.',
          type: snackbarType.error,
        })
      );
    } else if ([401, 403].includes(error?.response?.status)) {
      logout(true);
    } else if ([400, 500].includes(error?.response?.status)) {
      if ([500].includes(error?.response?.status)) {
        store.dispatch(
          openSnackbar({
            message: 'Ups! Parece que estamos teniendo problemas. Por favor volvé a intentarlo.',
            type: snackbarType.error,
          })
        );
      }

      throw error?.response?.data;
    }
  }
);

UnauthorizedService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      // Connection error
      store.dispatch(
        openSnackbar({
          message: 'Error de conexión. Por favor volvé a intentarlo.',
          type: snackbarType.error,
        })
      );
    } else if ([400, 500].includes(error?.response?.status)) {
      if ([500].includes(error?.response?.status)) {
        store.dispatch(
          openSnackbar({
            message: 'Ups! Parece que estamos teniendo problemas. Por favor volvé a intentarlo.',
            type: snackbarType.error,
          })
        );
      }

      throw error?.response?.data;
    }
  }
);

export { UnauthorizedService, AuthorizedService };
