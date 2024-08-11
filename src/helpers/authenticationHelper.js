import { resetAccount } from '../store/slice/accountSlice.js';
import store from '../store/store.js';

export const destroyAuthentication = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(resetAccount());
  };
};

export const logout = () => {
  store.dispatch(resetAccount());
  window.location.replace('/login');
};
