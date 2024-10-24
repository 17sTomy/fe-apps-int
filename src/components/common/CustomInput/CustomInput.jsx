import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useTheme } from '../../../hooks/useTheme';

export const CustomInput = ({ label, value, onChange }) => {
  const { theme } = useTheme();

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

  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      sx={inputStyles}
    />
  );
};
