import { useState, useEffect, useCallback } from 'react';
import { getFavoriteProducts, toggleFavoriteProduct } from '../services/productsService';

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const favoritesData = await getFavoriteProducts();
      setFavorites(favoritesData);
    } catch (err) {
      setError("Error al obtener los productos favoritos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleToggleFavorite = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await toggleFavoriteProduct(id);
      fetchFavorites();
    } catch (err) {
      setError("Error al actualizar el estado de favorito del producto.");
    } finally {
      setLoading(false);
    }
  };

  return { favorites, loading, error, handleToggleFavorite };
};

export default useFavorites;
