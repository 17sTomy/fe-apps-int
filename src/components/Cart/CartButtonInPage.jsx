import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { useCart } from '../../hooks/useCart';

export default function CartButtonInPage({ productId, productStock }) {
  const { addProductToCart, removeOneProductFromCart } = useCart();
  const cart = useSelector((state) => state.account).cart;
  const [quantity, setQuantity] = useState(0);
  const [existingProduct, setExistingProduct] = useState(null);

  useEffect(() => {
    if (cart && cart.cartItems) {
      const foundProduct = cart.cartItems.find((item) => item.product.id === productId);
      setExistingProduct(foundProduct);

      if (foundProduct) {
        setQuantity(foundProduct.quantity);
      }
    }
  }, [cart, productId]);

  const handleAddToCart = async () => {
    if (quantity < productStock) {
      addProductToCart(productId);
    }
  };

  const handleRemoveOneFromCart = () => {
    removeOneProductFromCart(productId);
  };

  return (
    <>
      {existingProduct ? (
        <>
          <Button size="large" variant="contained" onClick={handleRemoveOneFromCart}>
            -
          </Button>
          <Typography variant="h5">{quantity}</Typography>
          <Button size="large" variant="contained" onClick={handleAddToCart}>
            +
          </Button>
        </>
      ) : (
        <Button fullWidth size="large" variant="contained" onClick={handleAddToCart}>
          Add To Cart
        </Button>
      )}
    </>
  );
}
