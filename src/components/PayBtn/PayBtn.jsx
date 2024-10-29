import Button from '@mui/material/Button';
import React from 'react';
import { useSelector } from 'react-redux';

export const PayBtn = ({ handleCheckout }) => {
  const cart = useSelector((state) => state.account.cart);

  return (
    <div style={{ display: 'grid', placeItems: 'center', marginTop: 16 }}>
      <p>
        Total: <span style={{ fontWeight: 'bold' }}>${cart?.totalPrice}</span>
      </p>
      <Button className="btn" variant="contained" color="success" onClick={handleCheckout}>
        Confirmar pago
      </Button>
    </div>
  );
};
