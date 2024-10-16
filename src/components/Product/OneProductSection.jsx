import { useParams, useNavigate } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import Loader from '../common/Loader/Loader';
import { getProduct } from '../../services/productsService';
import { useTheme } from '../../hooks/useTheme';
import { Box, IconButton, Typography, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const OneProductSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, error } = useProducts(getProduct, id);
  const { theme } = useTheme();
  
  return ( 
    <>
      {loading && <Loader />}
      {error && <p>Error fetching products: {error.message}</p>}

      {!loading && !error && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            padding: '20px',
            width: '100%',
            margin: 'auto',
          }}
        >
          <Button
            startIcon={<ArrowBackIosNewIcon />}
            onClick={() => navigate(-1)}
            sx={{ alignSelf: 'flex-start', marginTop: '-20px' }}
          >
            Volver
          </Button>
          <Box
            component="img"
            src={products.imageUrl} 
            alt={products.title}
            sx={{
              width: '100%',
              maxHeight: '400px',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 2,
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              {products.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {products.description}
            </Typography>
            <Typography variant="h5" component="p" color="primary">
              ${products.price}
            </Typography>
            <Typography component="p">
              Stock: {products.stock} Unidades
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '300px',
                gap: 2,
              }}
            >
              <Button variant="contained" size="large" fullWidth>
                Add to Cart
              </Button>
              <IconButton sx={{ color: theme.name === 'dark' ? 'white' : 'black'}}>
                <FavoriteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

