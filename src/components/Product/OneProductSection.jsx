import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import Loader from '../common/Loader/Loader';
import { getAllImages, getProduct, viewProduct } from '../../services/productsService';
import { useTheme } from '../../hooks/useTheme';
import { Box, IconButton, Typography, Button, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CartButtonInPage from '../Cart/CartButtonInPage';
import { ImageModifier } from './ImageModifier';
import Carousel from 'react-material-ui-carousel';
import * as React from 'react';
import useFavorites from '../../hooks/useFavorites';
import { useSelector } from 'react-redux';

export const OneProductSection = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const { products, loading, error } = useProducts(getProduct, id);
  const navigate = useNavigate();

  const favorites = useSelector((state) => state.favorites.favorites);
  const { handleToggleFavorite } = useFavorites();
  const isFavorite = favorites?.some(favorite => favorite === products.id);

  const [images, setImages] = useState([]);

  const fetchAllImages = async () => {
    const images = await getAllImages(products.id);
    setImages([{ url: products.imageUrl }, ...images]);
  };

  useEffect(() => {
    if (id) {
      viewProduct(id);
    }
  }, [id]);

  useEffect(() => {
    if (products.id) fetchAllImages();
  }, [products]);

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
          }}>
          <Button
            startIcon={<ArrowBackIosNewIcon />}
            onClick={() => navigate(-1)}
            sx={{ alignSelf: 'flex-start', marginTop: '-20px' }}>
            Volver
          </Button>
          <Carousel
            autoPlay="false"
            navButtonsAlwaysVisible
            sx={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
            next={(next, active) => console.log(`we left ${active}, and are now at ${next}`)}
            prev={(prev, active) => console.log(`we left ${active}, and are now at ${prev}`)}>
            {images.map((item, i) => (
              <ImageModifier key={i} item={item} />
            ))}
          </Carousel>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 2,
            }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {products.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {products.description}
            </Typography>
            <Typography variant="h5" component="p" color="primary">
              ${products.price}
            </Typography>
            <Typography component="p">Stock: {products.stock} Unidades</Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '300px',
                gap: 2,
              }}>
              {products.stock > 0 ? (
                <CartButtonInPage productId={products.id} productStock={products.stock} />
              ) : (
                <Chip
                  label="Agotado"
                  size="large"
                  color="error"
                  variant="contained"
                  sx={{ width: '100%', justifyContent: 'center', textAlign: 'center' }}
                />
              )}
              <IconButton
                sx={{ color: isFavorite ? 'red' : (theme.name === 'dark' ? 'white' : 'black') }}
                onClick={() => handleToggleFavorite(products.id)}
              >
                <FavoriteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
