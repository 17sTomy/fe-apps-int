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

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    await axios.delete(`${API_URL}/${productId}`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const updateProduct = async (id, productDetails) => {
  return axios.put(`${API_BASE_URL}/products/${id}`, productDetails);
};