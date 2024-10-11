import axios from 'axios';

const BASE_URL = 'http://localhost:8081';

const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b21hcyt0ZXN0aW5nQGdtYWlsLmNvbSIsImlhdCI6MTcyODY4MDA3OSwiZXhwIjoxNzI4NjgzNjc5fQ.hYzMCfp508AbEghPWQkaHbE1tOULH5wYHwGFLk5fHtY";

export const getAllProducts = async () => {
  const response = await axios.get(`${BASE_URL}/api/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getFeaturedProducts = async () => {
  const response = await axios.get(`${BASE_URL}/api/products/featured`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await axios.get(`${BASE_URL}/api/products/category/${category}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getViewedProducts = async () => {
  const response = await axios.get(`${BASE_URL}/api/products/recently-viewed`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
