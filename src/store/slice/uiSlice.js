import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    snackbar: {
      type: 'error',
      isOpen: false,
      message: '',
    },
  },
  reducers: {
    openSnackbar: (state, action) => {
      state.snackbar.isOpen = true;
      state.snackbar.message = action.payload.message;
      state.snackbar.type = action.payload.type;
    },
    closeSnackbar: (state) => {
      state.snackbar.isOpen = false;
      state.snackbar.message = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { openSnackbar, closeSnackbar } = uiSlice.actions;

export default uiSlice.reducer;
