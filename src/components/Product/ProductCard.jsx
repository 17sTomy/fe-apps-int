import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardActionArea, CardContent, Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import CartButton from '../Cart/CartButton';
import RecommendationsButton from '../Recommendations/RecommendationsButton'
import PropTypes from 'prop-types';
import ModifyButton from './ModifyButton';
import useFavorites from '../../hooks/useFavorites';
import useRecommendation from '../../hooks/useRecommendations';


const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  width: '200px',
  height: '335px',
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover .details': {
    transform: 'translateY(0)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  '&:hover img': {
    filter: 'blur(2px)',
  },
  '&:hover': {
    boxShadow: `0 4px 15px rgba(0, 129, 198, 0.8)`,
    transform: 'scale(1.05)',
  },
}));

const Details = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  transform: 'translateY(100%)',
  transition: 'transform 0.3s ease',
  color: 'white',
}));

export default function ProductCard({ product, modifier = false }) {
  const favorites = useSelector((state) => state.favorites.favorites);
  const { handleToggleFavorite } = useFavorites();

  const isFavorite = favorites?.some((favorite) => favorite === product.id);

  const { recommendations, loading, error } = useRecommendation(product.id);

  const handleRecommendationClick = () => {
    if (recommendations) {
      navigate(`/products/recommendations/${product.id}`, { state: { recommendations } });
    } else {
      console.error('No se han cargado recomendaciones.');
    }
  };

  return (
    <StyledCard>
      <Link to={modifier ? `/publicaciones/${product.id}` : `/productos/${product.id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="335"
            image={product.imageUrl}
            alt={product.name}
            sx={{ transition: 'filter 0.3s ease, transform 0.3s ease' }}
          />
        </CardActionArea>
      </Link>
      <Details className="details">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="white"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 3,
            }}
          >
            {product.description}
          </Typography>
          <Typography variant="h6" sx={{ color: 'white', marginTop: 'auto' }}>
            ${product.price}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {modifier ? (
            <ModifyButton productId={product.id} />
          ) : (
            <>
              {product.stock > 0 ? (
                <CartButton productId={product.id} productStock={product.stock} />
              ) : (
                <Chip label="Producto Agotado" color="error" variant="contained" />
              )}
              <IconButton
                aria-label="add to favorites"
                onClick={() => handleToggleFavorite(product.id)}
              >
                <FavoriteIcon sx={{ color: isFavorite ? 'red' : 'white' }} />
              </IconButton>
            </>
          )}
          <RecommendationsButton productId={product.id} />
        </Box>
      </Details>
    </StyledCard>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  modifier: PropTypes.bool,
};
