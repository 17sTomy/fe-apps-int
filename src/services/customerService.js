import { AuthorizedService } from '../api';

const BASE_URL = '/customer';

export const updateTheme = async (data) => {
  const response = await AuthorizedService.put(`${BASE_URL}/theme`, data);
  return response.data;
};
