import { AuthorizedService } from '../api';

const BASE_URL = '/api/transaction';

export const getTransactions = async () => {
  const response = await AuthorizedService.get(BASE_URL);
  return response.data;
};

export const getTransactionById = async (id) => {
  const response = await AuthorizedService.get(`${BASE_URL}/${id}`);
  return response.data;
};
 
export const checkout = async () => {
  const response = await AuthorizedService.post(BASE_URL);
  return response.data;
};
