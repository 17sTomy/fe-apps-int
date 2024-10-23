import { CircularProgress } from '@mui/material';

export const MaterialLoader = () => {
  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
      <CircularProgress size={76} />
    </div>
  );
};
