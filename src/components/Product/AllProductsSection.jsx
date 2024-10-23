import useProducts from '../../hooks/useProducts';
import ProductCard from './ProductCard';
import { Box } from '@mui/material';
import { getAllProducts } from '../../services/productsService';
import Loader from '../common/Loader/Loader';

export const AllProductsSection = () => {
  const { products, loading, error } = useProducts(getAllProducts);

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
          {products.map((product) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};
