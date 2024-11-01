import { useTheme } from './hooks/useTheme';
import { ThemeProvider } from '@mui/material';
import router from './router';
import { RouterProvider } from 'react-router-dom';
import React from 'react';

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const Entrypoint = () => {
  const { materialTheme } = useTheme();

  return (
    <ThemeProvider theme={materialTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};
