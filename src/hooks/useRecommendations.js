import { useState, useEffect } from 'react';
import { fetchRecommendations } from '../services/productsService';

const useRecommendations = (productId) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecommendations = async () => {
      setLoading(true);
      setError(null);
      const data = await fetchRecommendations(productId);
      setRecommendations(data);
      setLoading(false);
    };

    getRecommendations().catch((err) => setError(err));
  }, [productId]);

  return { recommendations, loading, error };
};

export default useRecommendations;