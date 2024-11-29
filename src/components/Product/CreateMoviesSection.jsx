import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { Box, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { CloudUpload, Save } from '@mui/icons-material';
import { validateCreateProductData } from '../../helpers/products.helper';
import { snackbarType, useSnackbar } from '../../hooks/useSnackbar';
import { styled } from '@mui/material/styles';
import { toBase64 } from '../../helpers';
import { addImage_v2, createProduct_v2 } from '../../services/productsV2Service';
import { IntermediateLoader } from '../common/Loader/IntermediateLoader';

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const CreateProductSection = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { showSnackbar } = useSnackbar();

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
  const [file, setFile] = useState('');
  const [secondaryImages, setSecondaryImages] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = async () => {
    setIsCreating(true);
    try {
      validateCreateProductData({ name, director, price, stock, file });
    } catch (error) {
      showSnackbar(error.message, snackbarType.error);
      return;
    }

    try {
      const base64Image = await toBase64(file);

      const response = await createProduct_v2({
        name,
        description,
        director,
        stock,
        price,
        imageUrl: base64Image,
      });

      if (secondaryImages.length) {
        for (const image of secondaryImages) {
          const base64 = await toBase64(image);
          await addImage_v2(response.id, { url: base64 });
        }
      }
      setIsCreating(false);
      showSnackbar('¡Producto creado exitosamente!', snackbarType.success);
      navigate(-1);
    } catch (e) {
      console.error(e);
      showSnackbar('Por favor, verificá que los datos sean correctos.', snackbarType.error);
    }
    setIsCreating(false);
  };

  const handleAddSecondaryImages = (e) => {
    if (e.target.files && e.target.files) setSecondaryImages(e.target.files);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
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
      }}
    >
      <IntermediateLoader open={isCreating} />
      <Button
        startIcon={<ArrowBackIosNewIcon />}
        onClick={() => navigate(-1)}
        sx={{
          alignSelf: 'flex-start',
          marginTop: '-20px',
        }}
      >
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
        }}
      >
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

        <Button
          sx={{ width: '100%' }}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUpload />}
        >
          Adjuntar imágen de portada
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => handleFileChange(e)}
            accept={'image/png, image/jpeg'}
          />
        </Button>

        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <Button
            sx={{ width: '100%' }}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUpload />}
          >
            Agregar imágenes secundarias
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => handleAddSecondaryImages(e)}
              multiple
              accept={'image/png, image/jpeg'}
            />
          </Button>

          <Button startIcon={<Save />} variant="contained" color="success" onClick={handleSave}>
            Crear
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
