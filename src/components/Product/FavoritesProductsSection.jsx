import useFavorites from '../../hooks/useFavorites';
import ProductCard from './ProductCard';
import { Box } from '@mui/material';
import Loader from '../common/Loader/Loader';

export const FavoritesProductsSection = () => {
  const { favorites, loading, error } = useFavorites();

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
          {favorites?.length === 0 ? (
            <h2 style={{ marginTop: '20px' }}>Puedes agregar a favoritos clickeando: ❤️</h2>
          ) : (
            favorites.map((product) => (
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
