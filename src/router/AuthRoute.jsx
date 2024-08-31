import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const AuthRoute = ({ children }) => {
  const accountStore = useSelector((state) => state.account);
  if (window.location.pathname !== '/login' && !accountStore.authenticated) {
    return <Navigate to={'/login'} />;
  }
  return children;
};
