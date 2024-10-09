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
  cart: {},
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.authenticated = true;
      state.accountInfo = action.payload.accountInfo;
      state.cart = action.payload.cart;
    },
    resetAccount: (state) => {
      state.authenticated = false;
      state.accountInfo = initialState.accountInfo;
      state.cart = initialState.cart;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAccount, resetAccount } = accountSlice.actions;

export default accountSlice.reducer;
