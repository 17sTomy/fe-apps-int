import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slice/counterSlice.js';

export default configureStore({
  reducer: {
    counter: counterSlice,
  },
});
