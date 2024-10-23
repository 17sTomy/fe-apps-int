import { createSlice } from '@reduxjs/toolkit';

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
          theme,
        } = action.payload.accountInfo;

        // En lugar de crear una instancia de Customer, simplemente usa los datos planos
        state.accountInfo = {
          id,
          email,
          firstname,
          lastname,
          streetNumber,
          streetName,
          complementaryAddress,
          kycStatus,
          isAdmin,
          theme,
        };
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

    setCart: (state, action) => {  state.cart = action.payload.cart}
  },
});

// Action creators are generated for each case reducer function
export const { setAccount, resetAccount, setCart } = accountSlice.actions;

export default accountSlice.reducer;
