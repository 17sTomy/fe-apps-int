import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDevice } from '../../../hooks/useDevice';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import '../kyc.styles.scss';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { IntermediateLoader } from '../../../components/common/Loader/IntermediateLoader';
import * as React from 'react';
import { resendVerificationCode, verifyVerificationCode } from '../../../services/authService';
import { snackbarType, useSnackbar } from '../../../hooks/useSnackbar';

export const KycCodeVerification = ({ setDisableNext, setEmitData }) => {
  const { isMobile } = useDevice();
  const { showSnackbar } = useSnackbar();

  const accountStore = useSelector((state) => state.account);

  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');
  const [showResendBtn, setShowResendBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [intervalId, setIntervalId] = useState(0);

  const handleInputChange = async (newValue, setValue, setError = null) => {
    if (newValue.length > 6) return;

    setValue(newValue);

    if (setError) {
      if (!newValue) {
        setError('Debes completar este campo');
      } else {
        setError('');
      }
    }
  };

  const verifyCode = async () => {
    setIsLoading(true);

    try {
      await verifyVerificationCode({ verificationCode });
      setSuccess(true);
      showSnackbar('¡Código verificado correctamente!', snackbarType.success);
    } catch (e) {
      setVerificationCodeError('Código incorrecto.');
      setShowResendBtn(true);
    }

    setIsLoading(false);
  };

  const handleResend = async () => {
    setResendCooldown(59);
    const id = setInterval(() => {
      setResendCooldown((prevValue) => prevValue - 1);
    }, 1000);
    setIntervalId(id);
    await resendVerificationCode();
  };

  useEffect(() => {
    if (resendCooldown === 0) {
      clearInterval(intervalId);
    }
  }, [resendCooldown]);

  useEffect(() => {
    const hasErrors = verificationCodeError !== '' || verificationCode === '';

    setDisableNext(hasErrors || !success);
    setEmitData({
      verificationCode,
    });
  }, [verificationCode, success]);

  useEffect(() => {
    if (verificationCode.length === 6) {
      verifyCode();
    }
  }, [verificationCode]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
      }}>
      <IntermediateLoader open={isLoading} />
      <Typography variant={isMobile ? 'h6' : 'h4'}>Verificación</Typography>

      <Typography variant="body1">
        Enviamos un código de verificación al email {accountStore.accountInfo.email}
      </Typography>

      <Box component="form" noValidate className="kyc-form">
        <TextField
          sx={{ width: 300, margin: 0 }}
          margin="normal"
          required
          fullWidth
          id="verificationCode"
          label="Código de verificación"
          name="verificationCode"
          autoFocus
          type="number"
          error={!!verificationCodeError}
          helperText={verificationCodeError}
          value={verificationCode}
          onChange={(e) => {
            handleInputChange(e.target.value, setVerificationCode, setVerificationCodeError);
          }}
        />

        {showResendBtn && (
          <Button variant="outlined" onClick={handleResend} disabled={resendCooldown > 0}>
            {resendCooldown > 0
              ? `Reenviar código en ${resendCooldown} segundos`
              : 'Reenviar código'}
          </Button>
        )}
      </Box>
    </Box>
  );
};
