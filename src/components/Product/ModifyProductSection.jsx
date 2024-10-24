import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import Loader from '../common/Loader/Loader';
import { getAllImages, getProduct } from '../../services/productsService';
import { useTheme } from '../../hooks/useTheme';
import { Box, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { Delete, Save } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import { ImageModifier } from './ImageModifier';

export const ModifyProductSection = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const { products, loading, error } = useProducts(getProduct, id);
  const navigate = useNavigate();

  const inputStyles = {
    marginTop: 3,
    width: 300,
    '& .MuiOutlinedInput-root': {
      color: theme.secondary,
      '&:hover': {
        border: '0px solid transparent',
      },
      // Class for the border around the input field
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.secondary,
      },
    },
    // Class for the label of the input field
    '& .MuiInputLabel-outlined': {
      color: theme.secondary,
    },
  };

  const [name, setName] = useState(products?.name ?? '');
  const [description, setDescription] = useState(products?.description ?? '');
  const [price, setPrice] = useState(products?.price ?? '');
  const [stock, setStock] = useState(products?.stock ?? '');
  const [mainImage, setMainImage] = useState(products?.imageUrl ?? '');
  const [images, setImages] = useState([]);

  const fetchAllImages = async () => {
    const images = await getAllImages(products.id);
    setImages([{ url: products.imageUrl }, ...images]);
  };

  useEffect(() => {
    setName(products.name || '');
    setDescription(products.description || '');
    setPrice(products.price || '');
    setStock(products.stock || '');
    setMainImage(products.imageUrl || '');

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
            <TextField
              id="outlined-basic"
              label="Título"
              variant="outlined"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              sx={inputStyles}
            />
            <TextField
              id="outlined-basic"
              label="Descripción"
              variant="outlined"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              sx={inputStyles}
            />
            <TextField
              id="outlined-basic"
              label="Precio"
              variant="outlined"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              sx={inputStyles}
            />
            <TextField
              id="outlined-basic"
              label="Stock"
              variant="outlined"
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
              }}
              sx={inputStyles}
            />
            <TextField
              id="outlined-basic"
              label="URL Imágen de portada"
              variant="outlined"
              value={mainImage}
              onChange={(e) => {
                setMainImage(e.target.value);
              }}
              sx={inputStyles}
            />

            <Box
              sx={{
                marginTop: 4,
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '300px',
                gap: 2,
              }}>
              <Button startIcon={<Save />} variant="contained" color="success">
                Guardar
              </Button>
              <Button startIcon={<Delete />} variant="contained" color="error">
                Eliminar
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
