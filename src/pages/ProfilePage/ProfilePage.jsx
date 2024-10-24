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

        <CustomInput
          label="Calle"
          value={streetName}
          onChange={(e) => {
            setStreetName(e.target.value);
          }}
        />

        <CustomInput
          label="Número"
          value={streetNumber}
          onChange={(e) => {
            setStreetNumber(e.target.value);
          }}
        />

        <CustomInput
          label="Dpto / piso"
          value={complementaryAddress}
          onChange={(e) => {
            setComplementaryAddress(e.target.value);
          }}
        />

        <CustomInput
          label="Celular"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
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
