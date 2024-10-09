import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slice/counterSlice.js';
import accountSlice from './slice/accountSlice.js';
import themeSlice from './slice/themeSlice.js';
import cartSlice from './slice/cartSlice.js';

export default configureStore({
  reducer: {
    account: accountSlice,
    counter: counterSlice,
    theme: themeSlice,
    cart: cartSlice,
  },
});
