import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
