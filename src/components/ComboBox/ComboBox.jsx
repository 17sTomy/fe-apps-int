import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = [
  'Suspenso',
  'Terror',
  'Ciencia Ficción',
  'Romance',
  'Thriller',
  'Drama',
  'Animación',
  'Action',
  'Épica',
  'Comedia',
  'Aventura',
  'Musical',
  'Fantasía',
  'Crimen',
  'Autos',
].sort();

export default function ComboBox({
  setCategory,
  defaultValue = options[0],
  sx = {},
  inputSx = {},
}) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      defaultValue={defaultValue}
      onChange={(event, newValue) => {
        setCategory(newValue);
      }}
      sx={{
        width: '50%',
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'rgb(0, 129, 198)',
          },
          '& .MuiInputBase-input::placeholder': {
            color: 'white',
          },
        },
        input: {
          color: 'rgb(0, 129, 198)',
        },
        ...sx,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Categoría"
          InputLabelProps={{
            style: { color: 'rgb(0, 129, 198)', ...inputSx },
          }}
        />
      )}
    />
  );
}
