import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDevice } from '../../../hooks/useDevice';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import '../kyc.styles.scss';

export const KycResidential = ({ setDisableNext, setEmitData }) => {
  const { isMobile } = useDevice();

  const [streetName, setStreetName] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [complementaryAddress, setComplementaryAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [streetNameError, setStreetNameError] = useState('');
  const [streetNumberError, setStreetNumberError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const handleInputChange = (newValue, setValue, setError = null) => {
    setValue(newValue);

    if (setError) {
      if (!newValue) {
        setError('Debes completar este campo');
      } else {
        setError('');
      }
    }
  };

  useEffect(() => {
    const hasErrors =
      streetNameError !== '' ||
      streetNumberError !== '' ||
      phoneNumberError !== '' ||
      streetName === '' ||
      streetNumber === '' ||
      phoneNumber === '';

    setDisableNext(hasErrors);
    setEmitData({
      streetName,
      streetNumber,
      complementaryAddress,
      phoneNumber,
    });
  }, [streetName, streetNumber, complementaryAddress, phoneNumber]);

  return (
    <Box>
      <Typography variant={isMobile ? 'h6' : 'h4'}>Datos de envío</Typography>

      <Box component="form" noValidate className="kyc-form">
        <TextField
          sx={{ width: 300, margin: 0 }}
          margin="normal"
          required
          fullWidth
          id="streetName"
          label="Calle"
          name="streetName"
          autoComplete="streetName"
          autoFocus
          error={!!streetNameError}
          helperText={streetNameError}
          value={streetName}
          onChange={(e) => {
            handleInputChange(e.target.value, setStreetName, setStreetNameError);
          }}
        />

        <TextField
          sx={{ width: 300, margin: 0 }}
          margin="normal"
          required
          fullWidth
          id="streetNumber"
          label="Número"
          name="streetNumber"
          autoComplete="streetNumber"
          autoFocus
          error={!!streetNumberError}
          helperText={streetNumberError}
          value={streetNumber}
          onChange={(e) => {
            handleInputChange(e.target.value, setStreetNumber, setStreetNumberError);
          }}
        />

        <TextField
          sx={{ width: 300, margin: 0 }}
          margin="normal"
          fullWidth
          id="complementaryAddress"
          label="Dpto/Piso"
          name="complementaryAddress"
          autoComplete="complementaryAddress"
          autoFocus
          value={complementaryAddress}
          onChange={(e) => {
            handleInputChange(e.target.value, setComplementaryAddress);
          }}
        />

        <TextField
          sx={{ width: 300, margin: 0 }}
          margin="normal"
          required
          fullWidth
          id="phoneNumber"
          label="Número de celular"
          name="phoneNumber"
          autoComplete="phoneNumber"
          autoFocus
          error={!!phoneNumberError}
          helperText={phoneNumberError}
          value={phoneNumber}
          onChange={(e) => {
            handleInputChange(e.target.value, setPhoneNumber, setPhoneNumberError);
          }}
        />
      </Box>
    </Box>
  );
};
