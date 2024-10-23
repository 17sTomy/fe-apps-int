import { AuthorizedService } from '../api';

const BASE_URL = '/api/cart';

export const fetchCart = async () => {
  const response = await AuthorizedService.get(`${BASE_URL}`);
  console.log(response.data);
  return response.data;
};

export const addToCart = async (data) => {
  const response = await AuthorizedService.post(`${BASE_URL}/add`, data);
  return response;
};

export const removeFromCart = async (id) => {
  const response = await AuthorizedService.delete(`${BASE_URL}/remove/${id}`);
  return response;
};

export const removeOneFromCart = async (id) => {
  const response = await AuthorizedService.delete(`${BASE_URL}/reduce/${id}`);
  return response;
};

export const clearCart = async (id) => {
  const response = await AuthorizedService.delete(`${BASE_URL}/clear`);
  return response;
};
