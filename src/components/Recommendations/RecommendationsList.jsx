import React from 'react';
import { Box } from '@mui/material';
import ProductCard from '../Product/ProductCard'; 
import { MaterialLoader } from '../common/Loader/MaterialLoader';
import { AnimatedView } from '../common/AnimatedElements/AnimatedView';


const RecommendationsList = ({ recommendations, loading, error }) => {
  if (loading) {
    return <MaterialLoader />; 
  }

  if (error) {
    return <p>Error fetching recommendations: {error.message}</p>; 
  }

  if (!recommendations || recommendations.length === 0) {
    return <p>No hay recomendaciones disponibles.</p>;
  }

  return (
    <AnimatedView orientation="horizontal"> 
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center',
        }}
      >
        {recommendations.map((product) => (
          <Box key={product.id}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>
    </AnimatedView>
  );
};

export default RecommendationsList;