import useProducts from '../../hooks/useProducts';
import ProductCard from './ProductCard';
import { Box } from '@mui/material';
import { getAllProducts } from '../../services/productsService';
import Loader from '../common/Loader/Loader';
import { AnimatedView } from '../common/AnimatedElements/AnimatedView';
import { MaterialLoader } from '../common/Loader/MaterialLoader';
import { CustomInput } from '../common/CustomInput/CustomInput';

export const AllProductsSection = () => {
  const { filteredProducts, nameQuery, loading, error, setNameQuery } = useProducts(getAllProducts);

  return (
    <>
      {loading && <MaterialLoader />}
      {error && <p>Error fetching products: {error.message}</p>}

      {!loading && !error && (
        <AnimatedView orientation="horizontal">
          <div style={{ width: '100%', display: 'grid', placeItems: 'center' }}>
            <CustomInput
              value={nameQuery}
              onChange={setNameQuery}
              label="Buscar por título"
              sx={{ marginTop: 0, marginBottom: 3 }}
            />
          </div>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
            }}>
            {filteredProducts.map((product) => (
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
