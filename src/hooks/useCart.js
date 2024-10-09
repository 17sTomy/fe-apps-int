import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../services/cartService';
import { setCart } from '../store/slice/cartSlice';

export const useCart = () => {
  const accountStore = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const getCart = async () => {
    if (!accountStore.authenticated) {
      return null;
    }

    try {
      const cart = await fetchCart();
      dispatch(setCart(cart));
    } catch (e) {
      console.error(e);
    }
  };

  return {
    getCart,
  };
};
