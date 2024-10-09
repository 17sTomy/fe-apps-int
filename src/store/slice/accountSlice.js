import { createSlice } from '@reduxjs/toolkit';
import { Customer } from '../../model/Customer';

const initialState = {
  authenticated: false,
  accountInfo: null,
  cart: {},
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.authenticated = true;
      state.accountInfo = action.payload.accountInfo;

      try {
        const {
          id,
          email,
          firstname,
          lastname,
          streetNumber,
          streetName,
          complementaryAddress,
          kycStatus,
          isAdmin,
        } = action.payload.accountInfo;

        state.accountInfo = new Customer(
          id,
          email,
          firstname,
          lastname,
          streetNumber,
          streetName,
          complementaryAddress,
          kycStatus,
          isAdmin
        );
      } catch (e) {
        console.error(e);
        state.accountInfo = action.payload.accountInfo;
      }

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
