import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './kyc.styles.scss';
import Box from '@mui/material/Box';
import { Step, StepLabel, Stepper, ThemeProvider } from '@mui/material';
import Button from '@mui/material/Button';
import { useTheme } from '../../hooks/useTheme';
import { KycBasic } from './steps/KycBasic';
import { useDevice } from '../../hooks/useDevice';
import { LoadingButton } from '@mui/lab';
import { updateBasicKyc } from '../../services/customerService';

const steps = [
  { name: 'Información básica', component: KycBasic },
  { name: 'Información de envío' },
  { name: 'Confirmación' },
];

export const KycPage = () => {
  const accountStore = useSelector((state) => state.account);
  const { theme, materialTheme } = useTheme();
  const { isMobile } = useDevice();

  useEffect(() => {
    if (theme.name === 'dark') {
      document.body.style.background = theme.primary;
      document.body.style.color = theme.secondary;
    }
  }, []);

  if (!accountStore.authenticated) {
    return <Navigate to="/login" />;
  }

  // State
  const [disableNext, setDisableNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [emitData, setEmitData] = useState({});

  const initActiveStep = () => {
    if (accountStore.accountInfo.kycStatus === 'BASIC_KYC') return 0;
    else if (accountStore.accountInfo.kycStatus === 'RESIDENTIAL_KYC') return 1;
    else if (accountStore.accountInfo.kycStatus === 'COMPLETED_KYC') return 2;
  };

  const [activeStep, setActiveStep] = React.useState(initActiveStep());

  const handleNext = async () => {
    if (activeStep + 1 === steps.length) {
      // Redirección a /productos
      console.warn('Redirigir');
      return;
    }

    if (activeStep === 0) {
      try {
        await executeStepOneAction();
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepComponent = (Component) => {
    if (Component) {
      return <Component setEmitData={setEmitData} setDisableNext={setDisableNext} />;
    }
    return null;
  };

  const executeStepOneAction = async () => {
    setIsLoading(true);
    await updateBasicKyc(emitData);
    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={materialTheme}>
      <Box className="stepper-container">
        <Stepper
          orientation={isMobile ? 'vertical' : 'horizontal'}
          activeStep={activeStep}
          className="stepper"
          style={{ background: theme.name === 'dark' ? '' : '' }}>
          {steps.map((step, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={index} {...stepProps}>
                <StepLabel {...labelProps}>{step.name}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box className="stepper-content">
          <Box>{renderStepComponent(steps[activeStep]?.component)}</Box>
          <Box className="actions">
            {isLoading ? (
              <LoadingButton disabled loading variant="contained" className="button">
                {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
              </LoadingButton>
            ) : (
              <Button
                disabled={disableNext}
                variant="contained"
                onClick={handleNext}
                className="button">
                {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
