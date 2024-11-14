import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar, openSnackbar } from '../store/slice/uiSlice';

export const snackbarType = {
  error: 'error',
  success: 'success',
};

export const useSnackbar = () => {
  const uiStore = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [type, setType] = useState(snackbarType.error);

  const showSnackbar = (message, type) => {
    dispatch(openSnackbar({ message, type }));
  };

  const hideSnackbar = () => {
    dispatch(closeSnackbar());
  };

  return {
    // State
    isSnackbarActive: uiStore.snackbar.isOpen,
    message: uiStore.snackbar.message,
    type: uiStore.snackbar.type,

    // Methods
    showSnackbar,
    hideSnackbar,
  };
};
