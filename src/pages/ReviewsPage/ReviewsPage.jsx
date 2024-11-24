import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../../template/DashboardLayout/DashboardLayout';
import { Box, Typography, CircularProgress, Alert, Divider } from '@mui/material';
import { getReviewsByProductId } from '../../services/productsService';
import AddReview from '../../components/Reviews/AddReview';

const ReviewsPage = ({ productId, customerId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedReviews = await getReviewsByProductId(productId);
        setReviews(fetchedReviews);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleReviewAdded = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  return (
    <DashboardLayout>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Reviews
        </Typography>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && (
          <>
            <Divider sx={{ marginBottom: 2 }} />
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <Box key={`${review.userId}-${review.productId}`} sx={{ marginBottom: 2 }}>
                  <Typography><strong>Rating:</strong> {review.rating}</Typography>
                  <Typography><strong>Comment:</strong> {review.comment}</Typography>
                </Box>
              ))
            ) : (
              <Typography>No reviews available for this product.</Typography>
            )}
          </>
        )}

        <Divider sx={{ marginTop: 3, marginBottom: 2 }} />
        <AddReview customerId={customerId} productId={productId} onReviewAdded={handleReviewAdded} />
      </Box>
    </DashboardLayout>
  );
};

export default ReviewsPage;