import { useSelector } from 'react-redux';
import { RestrictedPage } from '../RestrictedPage';
import { DashboardLayout } from '../../template/DashboardLayout';
import { AnimatedView } from '../../components/common/AnimatedElements/AnimatedView';
import './checkout-page.styles.scss';
import { CustomInput } from '../../components/common/CustomInput/CustomInput';
import React, { useState } from 'react';
import { CreditCard } from '../../components/CreditCard/CreditCard';
import { Alert, Snackbar } from '@mui/material';
import { checkout } from '../../services/transactionService';
import { useDevice } from '../../hooks/useDevice';
import { PayBtn } from '../../components/PayBtn/PayBtn';
import { Check } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const CheckoutPage = () => {
  const accountStore = useSelector((state) => state.account);

  if (!accountStore.authenticated) {
    return <RestrictedPage />;
  }

  if (!accountStore.cart?.cartItems?.length) {
    return <Navigate to={'/productos'} />;
  }

  const { initSession } = useAuth();
  const { width } = useDevice();

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [error, setError] = useState(null);
  const [hasPayed, setHasPayed] = useState(false);

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

  const handleCvvChange = (number) => {
    if (number.length > 3) {
      return;
    }
    setCvv(number);
  };

  const handleCheckout = async () => {
    if (
      cardNumber.length !== 16 ||
      !cardNumber ||
      expirationDate.length !== 5 ||
      cvv.length !== 3
    ) {
      setError('Por favor completá todos los datos');
      setErrorSnackbarOpen(true);
      return;
    }

    try {
      await checkout();
      setSuccessSnackbarOpen(true);
      setHasPayed(true);
      await initSession();
    } catch (err) {
      setError(err?.error ?? 'Ocurrió un error al realizar la compra');
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
        {hasPayed ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 24,
            }}>
            <Check style={{ color: 'green', fontSize: 68 }} />
            <h1>Pago exitoso</h1>
            <h3>¡Muchas gracias!</h3>
          </div>
        ) : (
          <>
            <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Realizar pago</h1>
            <div className="checkout-page">
              <div className="left-container">
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
                <CustomInput
                  type="password"
                  value={cvv}
                  onChange={handleCvvChange}
                  label="Código de seguridad"
                />

                {width <= 1000 && <PayBtn handleCheckout={handleCheckout} />}

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
              <div className="right-container">
                <CreditCard
                  cardNumber={cardNumber}
                  cardName={cardName}
                  expirationDate={expirationDate}
                />

                {width > 1000 && <PayBtn handleCheckout={handleCheckout} />}
              </div>
            </div>
          </>
        )}
      </AnimatedView>
    </DashboardLayout>
  );
};
