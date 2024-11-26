import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
}));

function RecommendationsButton({ productId }) {
  const navigate = useNavigate();

  const handleRecommendationClick = () => {
    if (productId) { 
      navigate(`/recomendaciones/${productId}`);
    } else {
      console.error('No productId provided');
    }
  };

  return (
    <StyledButton onClick={handleRecommendationClick}>
      <FontAwesomeIcon icon={faLightbulb} />
    </StyledButton>
  );
}

export default RecommendationsButton;


