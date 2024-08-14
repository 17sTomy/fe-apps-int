import { UnauthorizedService, AuthorizedService } from '../api';

const BASE_URL = '/auth';

export const login = async (data) => {
  const response = await UnauthorizedService.post(`${BASE_URL}/login`, data);
  return response.data;
};

export const signup = async (data) => {
  const response = await UnauthorizedService.post(`${BASE_URL}/signup`, data);
  return response.data;
};

export const getAccountInfo = async () => {
  const response = await AuthorizedService.get(`${BASE_URL}/info`);
  return response.data;
};
