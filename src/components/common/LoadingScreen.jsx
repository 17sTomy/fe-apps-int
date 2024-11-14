import { CircularProgress } from '@mui/material';
import { useTheme } from '../../hooks/useTheme';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetAccount } from '../../store/slice/accountSlice';
import { useNavigate } from 'react-router-dom';

export const LoadingScreen = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let params = new URLSearchParams(document.location.search);
    if (params.get('d')) {
      dispatch(resetAccount());
      localStorage.clear();
      window.location.replace('/login');
    } else {
      // Cae a esta página sin motivos, llevamos al usuario a productos
      navigate('/productos');
    }
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
        width: '100vw',
        zIndex: '2000',
        background: theme.primary,
      }}>
      <CircularProgress />
    </div>
  );
};
