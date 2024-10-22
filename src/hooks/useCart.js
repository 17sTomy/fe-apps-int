import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../store/slice/cartSlice';
import { 
  fetchCart, 
  addToCart,
} from '../services/cartService';

export const useCart = () => {
  const accountStore = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

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

  const addProductToCart = async (productId, amount) => {
    setError(null);
    try {
      const data = {
        productId, 
        amount
      };
      await addToCart(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    error,
    getCart,
    addProductToCart,
  };
};
