import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { useCart } from '../../hooks/useCart';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.3)', 
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
  },
}));

export default function AddToCartButton({ productId, quantity = 1 }) {
  const { addProductToCart, error } = useCart();

  const handleAddToCart = () => {
    addProductToCart(productId, quantity)
  };

  return (
    <StyledButton size='small' onClick={handleAddToCart}>
      Add To Cart
    </StyledButton>
  );
}