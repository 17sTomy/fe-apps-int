import { useState } from 'react';
import useProducts from '../../hooks/useProducts';
import ProductCard from './ProductCard';
import ComboBox from '../ComboBox/ComboBox';
import { Box } from '@mui/material'; 
import { getProductsByCategory } from '../../services/productsService';

export const ByCategoryProductsSection = () => {
  const [category, setCategory] = useState(null);
  const { products, loading, error } = useProducts(getProductsByCategory, category);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching products: {error.message}</p>}

      {!loading && !error && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 2,
          }}
        >
          <ComboBox setCategory={setCategory} />
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center'
            }}
          >
            {products.map((product) => (
              <Box key={product.id}>
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};