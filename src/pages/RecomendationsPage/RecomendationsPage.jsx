import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../../template/DashboardLayout/DashboardLayout';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { getRecommendations } from '../../services/recommendationsService';

const RecommendationsPage = ({ criteria }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedRecommendations = await getRecommendations(criteria);
        setRecommendations(fetchedRecommendations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [criteria]);

  return (
    <DashboardLayout>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Recommendations
        </Typography>

        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && (
          recommendations.map((product) => (
            <Box key={product.id} sx={{ marginBottom: 2 }}>
              <Typography><strong>{product.name}</strong></Typography>
              <Typography>{product.description}</Typography>
            </Box>
          ))
        )}
      </Box>
    </DashboardLayout>
  );
};

export default RecommendationsPage;