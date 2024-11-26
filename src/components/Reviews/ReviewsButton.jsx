import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ReviewsButton = ({ productId }) => {
  const navigate = useNavigate();

  const handleReviewClick = () => {
    console.log('Navigating to reviews for productId:', productId); // Verifica el valor
    if (productId) {
      navigate(`/reseñas/${productId}`);
    } else {
      console.error('No productId provided');
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      onClick={handleReviewClick}
      sx={{
        fontSize: '0.7rem',
        minWidth: '30px',
        padding: '8px 8px',
      }}
    >
      <FontAwesomeIcon icon={faStar} />
    </Button>
  );
};

export default ReviewsButton;