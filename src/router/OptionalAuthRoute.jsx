import { useSelector } from 'react-redux';
import { logout } from '../helpers/authenticationHelper';
import { useEffect, useState } from 'react';
import { LoadingScreen } from '../components/common/LoadingScreen';
import useAuth from '../hooks/useAuth';

export const OptionalAuthRoute = ({ children }) => {
  const accountStore = useSelector((state) => state.account);
  const { initSession } = useAuth();

  const [intentInProgress, setIntentInProgress] = useState(true);

  const sessionIntent = async () => {
    setIntentInProgress(true);
    try {
      await initSession();
    } catch (e) {
      console.error(e);
      logout();
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
