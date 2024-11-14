import { resetAccount } from '../store/slice/accountSlice.js';
import store from '../store/store.js';

export const logout = (redirect = false) => {
  if (redirect) {
    window.location.replace('/cargando?d=true');
    return;
  }
  store.dispatch(resetAccount());
  localStorage.clear();
};
