import { Link } from 'react-router-dom';
import { Card, CardMedia, CardActionArea, CardContent, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import AddToCartButton from '../Cart/AddToCartButton';

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

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.3)', 
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
  },
}));

export default function ProductCard({ product }) {
  return (
    <StyledCard>
      <Link to={`/productos/${product.id}`}>
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
          <Typography variant="body2" color="white">
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
          <AddToCartButton />
          <IconButton aria-label="add to favorites">
            <FavoriteIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
      </Details>
    </StyledCard>
  );
}
