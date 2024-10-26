import { useState, useEffect } from 'react';
import { getFavoriteProducts, toggleFavoriteProduct } from '../services/productsService';

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavoriteProducts();
        setFavorites(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleToggleFavorite = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await toggleFavoriteProduct(id);
    } catch (err) {
      setError("Error al actualizar el estado de favorito del producto.");
    } finally {
      setLoading(false);
    }
  };

  return { 
    handleToggleFavorite, 
    favorites, 
    loading, 
    error 
  };
};

export default useFavorites;
