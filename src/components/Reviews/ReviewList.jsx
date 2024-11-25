import React from 'react';
import { Box, Typography } from '@mui/material';

const ReviewList = ({ reviews }) => (
  <Box>
      {reviews.map((review, index) => (
      <Box key={`${review.userId}-${review.productId}-${index}`} sx={{ marginBottom: 2 }}>
        <Typography><strong>Rating:</strong> {review.rating}</Typography>
        <Typography><strong>Comment:</strong> {review.comment}</Typography>
      </Box>
    ))}
  </Box>
);

export default ReviewList;

