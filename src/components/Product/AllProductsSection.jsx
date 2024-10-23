import useProducts from '../../hooks/useProducts';
import ProductCard from './ProductCard';
import { Box } from '@mui/material';
import { getAllProducts } from '../../services/productsService';
import Loader from '../common/Loader/Loader';
import { AnimatedView } from '../common/AnimatedElements/AnimatedView';
import { MaterialLoader } from '../common/Loader/MaterialLoader';

export const AllProductsSection = () => {
  const { products, loading, error } = useProducts(getAllProducts);

  return (
    <>
      {loading && <MaterialLoader />}
      {error && <p>Error fetching products: {error.message}</p>}

      {!loading && !error && (
        <AnimatedView orientation="horizontal">
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
            }}>
            {products.map((product) => (
              <Box key={product.id}>
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>
        </AnimatedView>
      )}
    </>
  );
};
