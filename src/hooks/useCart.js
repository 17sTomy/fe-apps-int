import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../store/slice/cartSlice';
import { 
  fetchCart, 
  addToCart,
  removeOneFromCart
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

  const addProductToCart = async (productId, amount = 1) => {
    setError(null);
    try {
      const data = {
        productId, 
        amount
      };
      const response = await addToCart(data);
      if (response.status === 200) {
        const updatedCart = await fetchCart();
        dispatch(setCart(updatedCart));
      };
    } catch (error) {
      setError(error.message);
    }
  };

  const removeOneProductFromCart = async (productId) => {
    setError(null);
    try {
      const response = await removeOneFromCart(productId);
      if (response.status === 200) {
        const updatedCart = await fetchCart();
        dispatch(setCart(updatedCart));
      };
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    error,
    getCart,
    addProductToCart,
    removeOneProductFromCart,
  };
};
