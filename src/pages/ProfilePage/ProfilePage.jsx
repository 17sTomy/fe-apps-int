import { DashboardLayout } from '../../template/DashboardLayout';
import { useSelector } from 'react-redux';
import { RestrictedPage } from '../RestrictedPage';
import { Navigate, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import { Save } from '@mui/icons-material';
import { editCustomerInfoV2 } from '../../services/customerService';
import useAuth from '../../hooks/useAuth';

export const ProfilePage = () => {
  const accountStore = useSelector((state) => state.account);

  if (!accountStore.authenticated) {
    return <RestrictedPage />;
  } else if (accountStore.accountInfo.kycStatus !== 'COMPLETED_KYC') {
    return <Navigate to="/kyc" />;
  }

  const { theme } = useTheme();

  const [streetName, setStreetName] = useState(accountStore.accountInfo.streetName ?? '');
  const [streetNumber, setStreetNumber] = useState(accountStore.accountInfo.streetNumber ?? '');
  const [complementaryAddress, setComplementaryAddress] = useState(
    accountStore.accountInfo.complementaryAddress ?? ''
  );
  const [phoneNumber, setPhoneNumber] = useState(accountStore.accountInfo.phoneNumber ?? '');

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

  const navigate = useNavigate();
  const { initSession } = useAuth();

  const handleSave = async () => {
    await editCustomerInfoV2({
      streetName,
      streetNumber,
      complementaryAddress,
      phoneNumber: phoneNumber,
    });

    await initSession();
    navigate(-1);
  };

  return (
    <DashboardLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 2,
        }}>
        <h1>Mi perfil</h1>

        <TextField
          id="outlined-basic"
          label="Calle"
          variant="outlined"
          value={streetName}
          onChange={(e) => {
            setStreetName(e.target.value);
          }}
          sx={inputStyles}
        />

        <TextField
          id="outlined-basic"
          label="Número"
          variant="outlined"
          value={streetNumber}
          onChange={(e) => {
            setStreetNumber(e.target.value);
          }}
          sx={inputStyles}
        />

        <TextField
          id="outlined-basic"
          label="Dpto/piso"
          variant="outlined"
          value={complementaryAddress}
          onChange={(e) => {
            setComplementaryAddress(e.target.value);
          }}
          sx={inputStyles}
        />

        <TextField
          id="outlined-basic"
          label="Celular"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          sx={inputStyles}
        />

        <Button
          variant="contained"
          color="success"
          startIcon={<Save />}
          sx={{ marginTop: 1 }}
          onClick={handleSave}>
          Guardar
        </Button>
      </Box>
    </DashboardLayout>
  );
};
