import { Alert, Snackbar } from '@mui/material';
import * as React from 'react';
import { useSnackbar } from '../../../hooks/useSnackbar';

export const CustomSnackbar = () => {
  const { isSnackbarActive, hideSnackbar, message, type } = useSnackbar();

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isSnackbarActive}
      onClose={hideSnackbar}
      autoHideDuration={5000}>
      <Alert onClose={hideSnackbar} severity={type} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
