import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticated: false,
  accountInfo: {
    id: 0,
    email: '',
    firstname: '',
    lastname: '',
    kycCompleted: false,
  },
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.authenticated = true;
      state.accountInfo = action.payload;
    },
    resetAccount: (state) => {
      state.authenticated = false;
      state.accountInfo = initialState.accountInfo;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAccount, resetAccount } = accountSlice.actions;

export default accountSlice.reducer;
