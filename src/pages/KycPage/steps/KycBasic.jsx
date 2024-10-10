import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDevice } from '../../../hooks/useDevice';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import '../kyc.styles.scss';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { compareTwoDates, formatDateToYYYYMMDD } from '../../../helpers';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const date18YearsAgo = dayjs().subtract(18, 'year');

export const KycBasic = ({ setDisableNext, setEmitData }) => {
  const { isMobile } = useDevice();
  const accountStore = useSelector((state) => state.account);

  const [firstName, setFirstName] = useState(accountStore.accountInfo?.firstname ?? '');
  const [lastName, setLastName] = useState(accountStore.accountInfo?.lastname ?? '');
  const [date, setDate] = useState(null);
  const [formatedDate, setFormatedDate] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [dateError, setDateError] = useState('');

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

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const parsedDate = new Date(newDate?.$d);

    if (isNaN(parsedDate.getDate())) {
      setDateError('Fecha inválida');
      return;
    }
    setFormatedDate(formatDateToYYYYMMDD(parsedDate));
    if (compareTwoDates(parsedDate, date18YearsAgo.toDate()) === 1) {
      setDateError('Tenés que tener al menos 18 años');
    } else if (parsedDate.getFullYear() > 1900) {
      setDateError('');
    }
  };

  useEffect(() => {
    const hasErrors =
      firstNameError !== '' ||
      lastNameError !== '' ||
      dateError !== '' ||
      firstName === '' ||
      lastName === '' ||
      date === null;

    setDisableNext(hasErrors);
    setEmitData({
      firstname: firstName,
      lastname: lastName,
      dateOfBirth: formatedDate.replaceAll('/', '-'),
    });
  }, [firstName, lastName, date]);

  return (
    <Box>
      <Typography variant={isMobile ? 'h6' : 'h4'}>Información básica</Typography>

      <Box component="form" noValidate className="kyc-form">
        <TextField
          sx={{ width: 300, margin: 0 }}
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="Nombre/s"
          name="firstName"
          autoComplete="firstName"
          autoFocus
          error={!!firstNameError}
          helperText={firstNameError}
          value={firstName}
          onChange={(e) => {
            handleInputChange(e.target.value, setFirstName, setFirstNameError);
          }}
        />

        <TextField
          sx={{ width: 300, margin: 0 }}
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Apellido/s"
          name="lastName"
          autoComplete="lastName"
          autoFocus
          error={!!lastNameError}
          helperText={lastNameError}
          value={lastName}
          onChange={(e) => {
            handleInputChange(e.target.value, setLastName, setLastNameError);
          }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha de nacimiento"
            sx={{ width: 300 }}
            value={date}
            onChange={(newValue) => {
              handleDateChange(newValue);
            }}
            maxDate={date18YearsAgo}
            slotProps={{
              textField: {
                helperText: dateError,
              },
            }}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};
