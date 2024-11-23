import { useDispatch, useSelector } from 'react-redux';
import { setFavorites, setLoading, setError } from '../store/slice/favoritesSlice';
import { getFavoriteProducts, toggleFavoriteProduct } from '../services/productsService';

const useFavorites = () => {
  const accountStore = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const fetchFavorites = async () => {
    if (!accountStore.authenticated) {
      return null;
    }

    dispatch(setLoading());
    try {
      const favorites = await getFavoriteProducts();
      dispatch(setFavorites(favorites));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      await toggleFavoriteProduct(id);
      await fetchFavorites();
    } catch (err) {
      dispatch(setError('Error al actualizar el estado de favorito del producto'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    fetchFavorites,
    handleToggleFavorite,
  };
};

export default useFavorites;
