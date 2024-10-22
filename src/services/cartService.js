import { AuthorizedService } from '../api';

const BASE_URL = '/api/cart';

export const fetchCart = async () => {
  const response = await AuthorizedService.get(`${BASE_URL}`);
  console.log(response.data)
  return response.data;
};

export const addToCart = async (data) => {
  await AuthorizedService.post(`${BASE_URL}/add`, data);
};