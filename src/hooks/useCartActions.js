import { useState } from "react";
import { addToCart } from "../services/cartService";

const useCartActions = () => {
  const [error, setError] = useState(null);  

  const handleAddToCart = async (productId, amount) => {
    setError(null);
    try {
      const data = {
        productId, 
        amount
      }
      await addToCart(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return { 
    loading,
    error, 
    handleAddToCart,
  };
};

export default useCartActions;