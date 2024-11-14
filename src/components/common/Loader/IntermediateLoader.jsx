import { CircularProgress } from '@mui/material';
import { useTheme } from '../../../hooks/useTheme';
import { createPortal } from 'react-dom';

export const IntermediateLoader = ({ open = false }) => {
  const { theme } = useTheme();

  return createPortal(
    <div
      style={{
        display: open ? 'grid' : 'none',
        placeItems: 'center',
        height: '100vh',
        width: '100vw',

        position: 'fixed',
        top: 0,
        left: 0,
        background: theme.name === 'light' ? 'rgba(255,255,255,0.90)' : 'rgba(12,12,12,0.90)',
        zIndex: 2000,
      }}>
      <CircularProgress size={76} />
    </div>,
    document.getElementById('preloader')
  );
};
