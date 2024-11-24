import React, { useState, useEffect } from 'react'; 
import { MaterialLoader } from '../../components/common/Loader/MaterialLoader'; 
import RecommendationsList from "../../components/Recommendations/RecommendationsList";
import { fetchRecommendations } from '../../services/productsService';
import { DashboardLayout } from '../../template/DashboardLayout';
import { useParams } from 'react-router-dom'; 

const RecommendationsPage = () => {
  const { id } = useParams(); 

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecommendations = async () => {
      if (id) {
        try {
          const data = await fetchRecommendations(id);
          setRecommendations(data);
          setLoading(false);
        } catch (error) {
          setError('Error loading recommendations');
          setLoading(false); 
        }
      } else {
        setError('Product ID is missing');
        setLoading(false); 
      }
    };
  
    loadRecommendations();
  }, [id]);

  if (loading) return <MaterialLoader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <DashboardLayout>
      <div>
        <h1 style={styles.title}>
          <span role="img" aria-label="lightbulb">💡</span> 
          Recomendaciones basadas en el producto:
        </h1>
        <RecommendationsList recommendations={recommendations} />
      </div>
    </DashboardLayout>
  );
};

const styles = {
  title: {
    marginTop: '30px',
    textAlign: 'center',
    fontSize: '2rem',
    color: '#333',
    fontWeight: 'bold',
    animation: 'fadeIn 2s ease-in-out',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default RecommendationsPage;