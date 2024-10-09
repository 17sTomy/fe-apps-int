import { resetAccount } from '../store/slice/accountSlice.js';
import store from '../store/store.js';

export const logout = (redirect = false) => {
  store.dispatch(resetAccount());
  localStorage.clear();
  if (redirect) window.location.replace('/login');
};
