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

export const resendVerificationCode = async () => {
  const response = await AuthorizedService.put(`${BASE_URL}/resend-code`);
  return response.data;
};

export const verifyVerificationCode = async (data) => {
  const response = await AuthorizedService.post(`${BASE_URL}/verify-code`, data);
  return response.data;
};
