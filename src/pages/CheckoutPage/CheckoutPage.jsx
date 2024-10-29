import { useSelector } from 'react-redux';
import { RestrictedPage } from '../RestrictedPage';
import { DashboardLayout } from '../../template/DashboardLayout';
import { AnimatedView } from '../../components/common/AnimatedElements/AnimatedView';
import './checkout-page.styles.scss';
import { CustomInput } from '../../components/common/CustomInput/CustomInput';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { CreditCard } from '../../components/CreditCard/CreditCard';
import { Alert, Snackbar } from '@mui/material';
import { checkout } from '../../services/transactionService';

export const CheckoutPage = () => {
  const accountStore = useSelector((state) => state.account);

  if (!accountStore.authenticated) {
    return <RestrictedPage />;
  }

  const cart = useSelector((state) => state.account.cart);

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [ccv, setCcv] = useState('');
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleCardNumberChange = (number) => {
    if (number.length > 16) {
      return;
    }
    setCardNumber(number);
  };

  const handleExpirationDateChange = (newValue) => {
    const sanitizedValue = newValue.replace(/[^0-9]/g, '');

    if (sanitizedValue.length > 4) return;

    const formattedValue =
      sanitizedValue.length >= 3
        ? `${sanitizedValue.slice(0, 2)}/${sanitizedValue.slice(2, 4)}`
        : sanitizedValue;

    setExpirationDate(formattedValue);
  };

  const handleCheckout = async () => {
    try {
      await checkout();
      setSuccessSnackbarOpen(true);
    } catch (err) {
      setError('Ocurrió un error al realizar la compra');
      setErrorSnackbarOpen(true);
    }
  };

  const handleErrorCloseSnackbar = () => {
    setErrorSnackbarOpen(false);
  };

  const handleSuccessCloseSnackbar = () => {
    setSuccessSnackbarOpen(false);
    window.location.reload();
  };

  return (
    <DashboardLayout>
      <AnimatedView orientation="horizontal">
        <div className="checkout-page">
          <CreditCard cardNumber={cardNumber} cardName={cardName} expirationDate={expirationDate} />
          <h1 style={{ marginTop: 24 }}>Realizar pago</h1>
          <CustomInput
            value={cardNumber}
            onChange={handleCardNumberChange}
            label="Número de tarjeta"
          />
          <CustomInput value={cardName} onChange={setCardName} label="Nombre y apellido" />
          <CustomInput
            value={expirationDate}
            onChange={handleExpirationDateChange}
            label="Fecha de vencimiento"
          />
          <CustomInput type="password" value={ccv} onChange={setCcv} label="Código de seguridad" />

          <p style={{ marginTop: 16 }}>
            Total: <span style={{ fontWeight: 'bold' }}>${cart?.totalPrice}</span>
          </p>

          <Button className="btn" variant="contained" color="success" onClick={handleCheckout}>
            Confirmar pago
          </Button>

          <Snackbar
            open={errorSnackbarOpen}
            autoHideDuration={5000}
            onClose={handleErrorCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ width: '100%', marginTop: '-6%' }}>
            <Alert onClose={handleErrorCloseSnackbar} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>

          <Snackbar
            open={successSnackbarOpen}
            autoHideDuration={5000}
            onClose={handleSuccessCloseSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ width: '100%', marginTop: '-6%' }}>
            <Alert
              onClose={handleSuccessCloseSnackbar}
              severity="success"
              sx={{ width: '100%', textAlign: 'center' }}>
              Compra Realizada con Éxito. Gracias!
            </Alert>
          </Snackbar>
        </div>
      </AnimatedView>
    </DashboardLayout>
  );
};
