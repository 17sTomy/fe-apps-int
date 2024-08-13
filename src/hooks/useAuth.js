import { getAccountInfo, login } from '../services/authService.js';
import { setAccount } from '../store/slice/accountSlice.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [authError, setAuthError] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCloseSnackbar = () => setShowSnackbar(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.trim();
    const password = data.get('password')?.trim();

    try {
      const data = {
        email,
        password,
      };
      const loginResponse = await login(data);
      localStorage.setItem('token', loginResponse.token);

      const infoResponse = await getAccountInfo();
      dispatch(setAccount(infoResponse));
      navigate('/');
    } catch (e) {
      console.error(e);
      setAuthError(true);
      setShowSnackbar(true);
    }
  };

  return {
    showSnackbar,
    handleCloseSnackbar,
    handleLogin,
    authError,
  };
}
