import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDevice } from '../../../hooks/useDevice';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

export const KycComplete = () => {
  const { isMobile } = useDevice();
  const navigate = useNavigate();
  const { initSession } = useAuth();

  const handleFinalization = async () => {
    await initSession();
    navigate('/productos');
  };

  return (
    <Box sx={styles.container}>
      <Typography variant={isMobile ? 'h6' : 'h4'}>¡Listo!</Typography>
      <Typography variant={isMobile ? 'h7' : 'h5'}>
        Comenzá a explorar nuestros productos
      </Typography>
      <Button variant="contained" onClick={handleFinalization} sx={styles.button}>
        Explorar
      </Button>
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  button: {
    marginTop: 4,
  },
};
