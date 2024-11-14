import { AuthorizedService, UnauthorizedService } from '../api';

const BASE_URL = 'api/v2/products';

export const createProduct_v2 = async (productData) => {
  const response = await AuthorizedService.post(BASE_URL, productData);
  return response.data;
};

export const addImage_v2 = async (id, data) => {
  const response = await AuthorizedService.post(`${BASE_URL}/post/${id}/images`, data);
  return response.data;
};

export const updateProduct_v2 = async (productId, data) => {
  await AuthorizedService.put(`${BASE_URL}/${productId}`, data);
};
