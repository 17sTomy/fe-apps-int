import { CircularProgress } from '@mui/material';
import { useTheme } from '../../hooks/useTheme';

export const LoadingScreen = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
        width: '100vw',
        zIndex: '2000',
        background: theme.primary,
      }}
    >
      <CircularProgress />
    </div>
  );
};
