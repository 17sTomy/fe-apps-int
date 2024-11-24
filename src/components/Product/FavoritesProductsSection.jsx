import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import ProductCard from './ProductCard';
import Loader from '../common/Loader/Loader';
import { getAllProducts } from '../../services/productsService';
import useProducts from '../../hooks/useProducts';
import useFavorites from '../../hooks/useFavorites';

export const FavoritesProductsSection = () => {
  const favorites = useSelector((state) => state.favorites.favorites);
  const { fetchFavorites } = useFavorites();

  const { products, loading, error } = useProducts(getAllProducts);
  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <>
      {loading && <Loader />}
      {error && <h1 style={{textAlign: 'center'}}>Ops! Ocurrió un error😭</h1>}

      {!loading && !error && (
        <Box>
          {favoriteProducts?.length === 0 ? (
            <h1 style={{ marginTop: '30px', textAlign: 'center' }}>
              Puedes agregar a favoritos clickeando: ❤️
            </h1>
          ) : (
            <>
              <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Tus ❤️</h1>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: 'center',
                }}
              >
                {favoriteProducts.map((product) => (
                  <Box key={product.id}>
                    <ProductCard product={product} />
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Box>
      )}
    </>
  );
};
