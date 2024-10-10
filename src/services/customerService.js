import { AuthorizedService } from '../api';

const BASE_URL = '/customer';

export const updateTheme = async (data) => {
  const response = await AuthorizedService.put(`${BASE_URL}/theme`, data);
  return response.data;
};

export const updateBasicKyc = async (data) => {
  const response = await AuthorizedService.post(`${BASE_URL}/kyc`, data);
  return response.data;
};

export const updateResidentialKyc = async (data) => {
  const response = await AuthorizedService.post(`${BASE_URL}/kyc-residential`, data);
  return response.data;
};
