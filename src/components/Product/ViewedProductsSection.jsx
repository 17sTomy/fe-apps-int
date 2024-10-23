import useProducts from '../../hooks/useProducts';
import ProductCard from './ProductCard';
import { Box } from '@mui/material';
import { getViewedProducts } from '../../services/productsService';
import Loader from '../common/Loader/Loader';

export const ViewedProductsSection = () => {
  const { products, loading, error } = useProducts(getViewedProducts);

  return (
    <>
      {loading && <Loader />}
      {error && <p>Error fetching products: {error.message}</p>}

      {!loading && !error && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
          }}
        >
          {products.length === 0 ? (
            <h2 style={{ marginTop: '20px' }}>No has visto películas todavía😭</h2>
          ) : (
            products.map((product) => (
              <Box key={product.id}>
                <ProductCard product={product} />
              </Box>
            ))
          )}
        </Box>
      )}
    </>
  );
};
