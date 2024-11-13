import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addImage, createProductV2 } from '../../services/productsService';
import { useTheme } from '../../hooks/useTheme';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { Add, Delete, Save } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { validateDataInputs } from '../../helpers/products.helper';

export const CreateProductSection = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const inputStyles = {
    width: '100%',
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
  const [director, setDirector] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [images, setImages] = useState([]);

  /*
  const validateInputs = () => {
    let error;

    if (!name.trim()) error = `Completar campo "Título"`;
    else if (!director.trim()) error = `Completar campo "Director"`;
    else if (!price.trim() || Number(price) < 0) error = 'Ingresar un precio válido';
    else if (!stock.trim() || Number(stock) < 0) error = 'Ingresar un stock válido';
    else if (!mainImage.trim()) error = 'Debés subir al menos una imágen';
    else {
      setShowSnackbar(false);
      return;
    }

    setErrorMsg(error);
    setShowSnackbar(true);
    throw new Error('Validation error');
  };

   */

  const handleSave = async () => {
    try {
      validateDataInputs({ name, director, price, stock, mainImage });
    } catch (error) {
      setErrorMsg(error.message);
      setShowSnackbar(true);
      return;
    }

    try {
      const response = await createProductV2({
        name,
        description,
        director,
        stock,
        price,
        imageUrl: mainImage,
      });

      if (images.length) {
        for (const image of images) {
          await addImage(response.id, image);
        }
      }

      navigate(-1);
    } catch (e) {
      console.error(e);
      setErrorMsg('Por favor, verificá que los datos sean correctos.');
      setShowSnackbar(true);
    }
  };

  const handleRemoveImage = (index) => {
    const filteredImages = images.filter((img, i) => i !== index);
    setImages(filteredImages);
  };

  const handleAddImage = () => {
    setImages([...images, { url: '' }]);
  };

  const handleImageChange = (e, index) => {
    const imgs = [...images];
    const image = imgs[index];
    image.url = e.target.value;
    setImages(imgs);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={showSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={5000}>
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}>
          {errorMsg}
        </Alert>
      </Snackbar>
      <Button
        startIcon={<ArrowBackIosNewIcon />}
        onClick={() => navigate(-1)}
        sx={{
          alignSelf: 'flex-start',
          marginTop: '-20px',
        }}>
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
          label="Director/es"
          variant="outlined"
          value={director}
          onChange={(e) => {
            setDirector(e.target.value);
          }}
          sx={inputStyles}
        />
        <TextField
          id="outlined-basic"
          label="Precio"
          type="number"
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
          type="number"
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

        {images.map((image, index) => (
          <motion.div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
            }}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: '100%',
            }}>
            <TextField
              id="outlined-basic"
              label="URL de imágen secundaria"
              variant="outlined"
              value={images[index].url}
              onChange={(e) => {
                handleImageChange(e, index);
              }}
              sx={inputStyles}
            />
            <motion.div
              transition={{ duration: 0.3 }}
              whileHover={{
                rotate: 360,
                scale: 1.1,
              }}
              style={{
                cursor: 'pointer',
                background: 'red',
                width: 40,
                height: 40,
                display: 'grid',
                placeItems: 'center',
                borderRadius: '100%',
              }}
              onClick={() => handleRemoveImage(index)}>
              <Delete fontSize="large" sx={{ color: '#fff' }} />
            </motion.div>
          </motion.div>
        ))}

        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            justifyContent: 'center',
            gap: 4,
          }}>
          <Button startIcon={<Save />} variant="contained" color="info" onClick={handleAddImage}>
            Agregar imágen
          </Button>
          <Button startIcon={<Save />} variant="contained" color="success" onClick={handleSave}>
            Crear
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
