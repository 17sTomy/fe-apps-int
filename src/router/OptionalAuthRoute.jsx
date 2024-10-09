import { useDispatch, useSelector } from 'react-redux';
import { getAccountInfo } from '../services/authService';
import { setAccount } from '../store/slice/accountSlice';
import { destroyAuthentication } from '../helpers/authenticationHelper';
import { useEffect, useState } from 'react';
import { LoadingScreen } from '../components/common/LoadingScreen';
import useAuth from '../hooks/useAuth';

export const OptionalAuthRoute = ({ children }) => {
  const accountStore = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const { initSession } = useAuth();

  const [intentInProgress, setIntentInProgress] = useState(true);

  const sessionIntent = async () => {
    setIntentInProgress(true);
    try {
      await initSession();
    } catch (e) {
      console.error(e);
      dispatch(destroyAuthentication());
    }
    setIntentInProgress(false);
  };

  useEffect(() => {
    const startIntent = async () => {
      if (localStorage.getItem('token') && !accountStore.authenticated) {
        await sessionIntent();
      } else {
        setIntentInProgress(false);
      }
    };
    startIntent();
  }, []);

  if (intentInProgress) {
    return <LoadingScreen />;
  } else {
    return children;
  }
};
