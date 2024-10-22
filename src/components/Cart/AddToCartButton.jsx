import { styled } from '@mui/system';
import { Button } from '@mui/material';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.3)', 
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
  },
}));

export default function AddToCartButton({ product }) {
  return (
    <StyledButton size='small'>
      Add To Cart
    </StyledButton>
  )
}