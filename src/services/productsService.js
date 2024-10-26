import { AuthorizedService, UnauthorizedService } from '../api';

const BASE_URL = 'api/products';

export const getAllProducts = async () => {
  const response = await UnauthorizedService.get(BASE_URL);
  return response.data;
};

export const getProduct = async (id) => {
  const response = await UnauthorizedService.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const getFeaturedProducts = async () => {
  const response = await UnauthorizedService.get(`${BASE_URL}/featured`);
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await UnauthorizedService.get(`${BASE_URL}/category/${category}`);
  return response.data;
};

export const getViewedProducts = async () => {
  const response = await AuthorizedService.get(`${BASE_URL}/recently-viewed`);
  return response.data;
};
 
export const viewProduct = async (id) => {
  await AuthorizedService.post(`${BASE_URL}/${id}/view`);
};

export const getFavoriteProducts = async () => {
  const response = await AuthorizedService.get(`${BASE_URL}/favorites`);
  return response.data;
};

export const toggleFavoriteProduct = async (id) => {
  await AuthorizedService.put(`${BASE_URL}/${id}/favorite`);
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const createProductV2 = async (productData) => {
  const response = await AuthorizedService.post(BASE_URL, productData);
  return response.data;
};

export const deleteProduct = async (productId) => {
  try {
    await axios.delete(`${API_URL}/${productId}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const deleteProductV2 = async (productId) => {
  await AuthorizedService.delete(`${BASE_URL}/${productId}`);
};

export const updateProductV2 = async (productId, data) => {
  await AuthorizedService.put(`${BASE_URL}/${productId}`, data);
};

export const updateProduct = async (id, productDetails) => {
  return axios.put(`${API_BASE_URL}/products/${id}`, productDetails);
};

export const getAllImages = async (id) => {
  const response = await AuthorizedService.get(`${BASE_URL}/${id}/images`);
  return response.data;
};

export const addImage = async (id, data) => {
  const response = await AuthorizedService.post(`${BASE_URL}/post/${id}/images`, data);
  return response.data;
};
