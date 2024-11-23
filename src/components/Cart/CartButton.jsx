import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { useCart } from '../../hooks/useCart';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
}));

export default function CartButton({ productId, productStock }) {
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
          <Button
            size="small"
            variant="contained"
            onClick={handleRemoveOneFromCart}
            sx={{ width: '25px', height: '25px', padding: 0, minWidth: '0' }}
          >
            -
          </Button>
          <Typography variant="h6">{quantity}</Typography>
          <Button
            size="small"
            variant="contained"
            onClick={handleAddToCart}
            sx={{ width: '25px', height: '25px', padding: 0, minWidth: '0' }}
          >
            +
          </Button>
        </>
      ) : (
        <StyledButton size="small" onClick={handleAddToCart}>
          Add To Cart
        </StyledButton>
      )}
    </>
  );
}
