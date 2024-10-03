import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';
import './loader.styles.scss';

export const Loader = () => {
  return (
    <Box className="loader">
      <CircularProgress />
    </Box>
  );
};
