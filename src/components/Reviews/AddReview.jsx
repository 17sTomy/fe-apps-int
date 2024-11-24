import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { addReview } from '../../services/productsService';

const AddReview = ({ customerId, productId, onReviewAdded }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const reviewData = { productId, rating: Number(rating), comment };

    try {
      const newReview = await addReview(customerId, reviewData);
      onReviewAdded(newReview); // Actualiza la lista de reviews
      setRating('');
      setComment('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 2 }}>
      <Typography variant="h6">Add a Review</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Rating (1-5)"
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
        required
        inputProps={{ min: 1, max: 5 }}
      />
      <TextField
        label="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        multiline
        rows={3}
        sx={{ marginBottom: 2 }}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Submit Review
      </Button>
    </Box>
  );
};

export default AddReview;