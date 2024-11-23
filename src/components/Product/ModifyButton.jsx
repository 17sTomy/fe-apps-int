import { Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
}));

export default function ModifyButton({ productId }) {
  const navigate = useNavigate();

  return (
    <>
      <StyledButton
        size="small"
        onClick={() => {
          navigate(`/publicaciones/${productId}`);
        }}
      >
        Modificar
      </StyledButton>
    </>
  );
}
