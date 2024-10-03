import { getAccountInfo } from '../services/authService.js';
import { setAccount } from '../store/slice/accountSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Loader } from '../components/common/Loader/Loader.jsx';

export const AuthRoute = ({ children }) => {
  const accountStore = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const [verifyingToken, setVerifyingToken] = useState(
    localStorage.getItem('token') && !accountStore.authenticated
  );

  useEffect(() => {
    const verifyToken = async () => {
      console.warn('ingreso');
      if (!localStorage.getItem('token')) return;

      try {
        const infoResponse = await getAccountInfo();
        dispatch(setAccount(infoResponse));
      } catch (e) {
        console.error(e);
        localStorage.clear();
      } finally {
        setVerifyingToken(false);
      }
    };

    verifyToken();
  }, [dispatch]);

  if (verifyingToken) {
    return <Loader />;
  }

  return children;
};
