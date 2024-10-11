import axios from 'axios';

const BASE_URL = 'http://localhost:8081';

export const getAllProducts = async () => {
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b21hcyt0ZXN0aW5nQGdtYWlsLmNvbSIsImlhdCI6MTcyODY3MjQzNywiZXhwIjoxNzI4Njc2MDM3fQ.cLyS29NvBE7fvRux5Wz-ndmpRDaOjctJNTVwpq3GUik";
  
  const response = await axios.get(`${BASE_URL}/api/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
