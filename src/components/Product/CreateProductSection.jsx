import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProductV2 } from '../../services/productsService';
import { useTheme } from '../../hooks/useTheme';
import { Box, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { Save } from '@mui/icons-material';

export const CreateProductSection = () => {
  const { theme } = useTheme();
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

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [images, setImages] = useState([]);

  const handleSave = async () => {
    await createProductV2({
      name,
      description,
      stock,
      price,
      imageUrl: mainImage,
    });

    navigate(-1);
  };

  return (
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

      <h1>Crear un producto</h1>

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
            display: 'grid',
            placeItems: 'center',
            width: '100%',
            maxWidth: '300px',
          }}>
          <Button startIcon={<Save />} variant="contained" color="success" onClick={handleSave}>
            Crear
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
