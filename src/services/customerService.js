import { AuthorizedService } from '../api';

const BASE_URL = '/customer';

export const updateTheme = async (data) => {
  const response = await AuthorizedService.put(`${BASE_URL}/theme`, data);
  return response.data;
};

export const updateBasicKyc = async (data) => {
  const response = await AuthorizedService.post(`${BASE_URL}/kyc`, data);
  return response.data;
};

export const updateResidentialKyc = async (data) => {
  const response = await AuthorizedService.post(`${BASE_URL}/kyc-residential`, data);
  return response.data;
};

export const approveAdminRequest = async (requestId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/admin/approve/${requestId}`);
    return response.data;
  } catch (error) {
    console.error('Error aprobando la solicitud de admin:', error);
    throw error;
  }
};

export const getPendingAdminRequests = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/pending-requests`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo solicitudes pendientes de admin:', error);
    throw error;
  }
};

export const editCustomerInfo = async (profileData) => {
  const response = await AuthorizedService.put(`${BASE_URL}/profile`, {
    streetName: profileData.streetName,
    streetNumber: profileData.streetNumber,
    complementaryAddress: profileData.complementaryAddress,
    phoneNumber: profileData.phoneNumber,
  });
  return response.data;
};
