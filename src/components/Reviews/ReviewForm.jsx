import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const ReviewForm = ({ onSubmit }) => {
  const [newReview, setNewReview] = useState({ rating: '', comment: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newReview);
    setNewReview({ rating: '', comment: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Add a Review</Typography>
      <TextField
        label="Rating (1-5)"
        type="number"
        value={newReview.rating}
        onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
        inputProps={{ min: 1, max: 5 }}
        required
      />
      <TextField
        label="Comment"
        multiline
        rows={4}
        value={newReview.comment}
        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default ReviewForm;