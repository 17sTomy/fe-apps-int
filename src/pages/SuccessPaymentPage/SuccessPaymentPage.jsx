import { Check } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { DashboardLayout } from '../../template/DashboardLayout';
import { AnimatedView } from '../../components/common/AnimatedElements/AnimatedView';

export const SuccessPaymentPage = () => {
  if (!localStorage.getItem('redirection')) {
    return <Navigate to="/productos" />;
  }

  useEffect(() => {
    localStorage.removeItem('redirection');
  }, []);

  return (
    <DashboardLayout>
      <AnimatedView>
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
      </AnimatedView>
    </DashboardLayout>
  );
};
