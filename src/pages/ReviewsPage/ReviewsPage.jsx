import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../../template/DashboardLayout/DashboardLayout';
import { Box, Typography, CircularProgress, Alert, Divider } from '@mui/material';
import { getReviewsByProductId, addReview } from '../../services/productsService';
import ReviewList from '../../components/Reviews/ReviewList';
import ReviewForm from '../../components/Reviews/ReviewForm';
import { useParams } from 'react-router-dom';

const ReviewsPage = () => {
  const { productId } = useParams(); 
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) {
      setError("Product ID is required.");
      return;
    }

    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedReviews = await getReviewsByProductId(productId);
        setReviews(Array.isArray(fetchedReviews) ? fetchedReviews : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleReviewAdded = async (newReviewData) => {
    try {
      const reviewDataToSend = {
        productId: productId,        
        rating: newReviewData.rating, 
        comment: newReviewData.comment, 
      };

      const newReview = await addReview(reviewDataToSend); 
      setReviews((prevReviews) => [...prevReviews, newReview]);  
    } catch (error) {
      console.error('Error adding review:', error.message);
      setError('Error adding review');
    }
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
              <ReviewList reviews={reviews} />
            ) : (
              <Typography>No reviews available for this product.</Typography>
            )}
          </>
        )}

        <Divider sx={{ marginTop: 3, marginBottom: 2 }} />
        {/* Pasa la función handleReviewAdded al formulario */}
        <ReviewForm onSubmit={handleReviewAdded} />
      </Box>
    </DashboardLayout>
  );
};

export default ReviewsPage;