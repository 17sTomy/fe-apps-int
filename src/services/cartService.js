import { AuthorizedService } from '../api';

const BASE_URL = '/api/cart';

export const fetchCart = async () => {
  const response = await AuthorizedService.get(`${BASE_URL}`);
  return response.data;
};
