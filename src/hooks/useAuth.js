import { getAccountInfo, login, signup } from '../services/authService.js';
import { setAccount } from '../store/slice/accountSlice.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { fetchCart } from '../services/cartService';
import { setTheme } from '../store/slice/themeSlice';
import { darkTheme, lightTheme } from '../theme';

export default function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [authError, setAuthError] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseSnackbar = () => setShowSnackbar(false);

  const initSession = async () => {
    const infoResponse = await getAccountInfo();
    const cartResponse = await fetchCart();
    dispatch(setAccount({ accountInfo: infoResponse, cart: cartResponse }));
    dispatch(setTheme(infoResponse.theme === 'DARK' ? darkTheme : lightTheme));
    return { accountInfo: infoResponse, cart: cartResponse };
  };

  const initLogin = async (data) => {
    const loginResponse = await login(data);
    localStorage.setItem('token', loginResponse.token);
    const accountData = await initSession();
    setIsLoading(false);
    if (accountData.accountInfo.kycStatus !== 'COMPLETED_KYC') {
      return navigate('/kyc');
    }
    return navigate('/productos');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.trim();
    const password = data.get('password')?.trim();

    try {
      return await initLogin({
        email,
        password,
      });
    } catch (e) {
      console.error(e);
      setAuthError(true);
      setShowSnackbar(true);
    }
  };

  const handleSignup = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.trim();
    const password = data.get('password')?.trim();
    const repeatPassword = data.get('password-repeat')?.trim();

    if (!email || !password || !repeatPassword || password !== repeatPassword) {
      setAuthError(true);
      setShowSnackbar(true);
      return;
    }

    try {
      const data = {
        email,
        password,
      };
      await signup(data);
      await initLogin(data);
    } catch (e) {
      console.error(e);
      setAuthError(true);
      setShowSnackbar(true);
    }
    setIsLoading(false);
  };

  return {
    showSnackbar,
    handleCloseSnackbar,
    handleLogin,
    handleSignup,
    authError,
    initSession,
    isLoading,
  };
}
