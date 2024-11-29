import { DashboardLayout } from '../../template/DashboardLayout';
import { useSelector } from 'react-redux';
import { RestrictedPage } from '../RestrictedPage';
import { Navigate, useNavigate } from 'react-router-dom';
import * as React from 'react';
import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import { Save } from '@mui/icons-material';
import { editCustomerInfoV2 } from '../../services/customerService';
import useAuth from '../../hooks/useAuth';
import { CustomInput } from '../../components/common/CustomInput/CustomInput';
import { Alert, Snackbar } from '@mui/material';

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
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

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
    setSuccessSnackbarOpen(true);
  };

  const handleSuccessCloseSnackbar = () => {
    setSuccessSnackbarOpen(false);
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
        }}
      >
        <h1>Mi perfil</h1>
        <h3>
          ¡Hola de nuevo,{' '}
          {`${accountStore.accountInfo.firstname} ${accountStore.accountInfo.lastname}!`}
        </h3>
        <p>
          Estás registrado con el email{' '}
          <span style={{ fontWeight: 'bold' }}>{accountStore.accountInfo.email}</span>
        </p>

        <CustomInput label="Calle" value={streetName} onChange={setStreetName} />

        <CustomInput label="Número" value={streetNumber} onChange={setStreetNumber} />

        <CustomInput
          label="Dpto / piso"
          value={complementaryAddress}
          onChange={setComplementaryAddress}
        />

        <CustomInput label="Celular" value={phoneNumber} onChange={setPhoneNumber} />

        <Button
          variant="contained"
          color="success"
          startIcon={<Save />}
          sx={{ marginTop: 1 }}
          onClick={handleSave}
        >
          Guardar
        </Button>

        <Snackbar
          open={successSnackbarOpen}
          autoHideDuration={5000}
          onClose={handleSuccessCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleSuccessCloseSnackbar}
            severity="success"
            sx={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            Datos modificados exitosamente.
          </Alert>
        </Snackbar>
      </Box>
    </DashboardLayout>
  );
};