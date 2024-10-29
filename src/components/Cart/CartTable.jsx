import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Alert,
  Snackbar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import { useCart } from '../../hooks/useCart';
import { useTransaction } from '../../hooks/useTransaction';
import HdIcon from '@mui/icons-material/Hd';
import Loader from '../common/Loader/Loader';

export default function CartTable() {
  const cart = useSelector((state) => state.account.cart);
  const { addProductToCart, removeOneProductFromCart, removeProductFromCart, clearAllFromCart } = useCart();
  const { checkout, loading } = useTransaction();
  const { theme } = useTheme();

  const [error, setError] = useState(null);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const tableCellStyles = {
    color: theme.name === 'dark' ? 'white' : 'black',
  };

  const totalAmount = cart?.cartItems?.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0) || 0;

  const handleCheckout = async () => {
    if (!successSnackbarOpen) {
      try {
        await checkout();
        setSuccessSnackbarOpen(true);
      } catch (err) {
        setError("Ocurrió un error al realizar la compra");
        setErrorSnackbarOpen(true); 
      }
    }
  };

  const handleErrorCloseSnackbar = () => {
    setErrorSnackbarOpen(false);
  };

  const handleSuccessCloseSnackbar = () => {
    setSuccessSnackbarOpen(false);
    window.location.reload(); 
  };

  if (loading) <Loader />

  return (
    <TableContainer>
      {cart?.cartItems?.length === 0 ? (
        <>
          <h1 style={{ textAlign: 'center', marginTop: '20px' }}>No Hay Productos en el Carrito</h1>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/productos"
              sx={{ margin: 'auto' }}
            >
              Comprar Ahora
              <HdIcon sx={{ marginLeft: '8px' }} />
            </Button>
          </div>
        </>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell sx={tableCellStyles}>Nombre</TableCell>
              <TableCell sx={tableCellStyles}>Precio</TableCell>
              <TableCell sx={tableCellStyles}>Cantidad</TableCell>
              <TableCell sx={tableCellStyles}>Precio Total</TableCell>
              <TableCell sx={tableCellStyles}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart?.cartItems?.map((item) => (
              <TableRow key={item.product.id}>
                <TableCell>
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell sx={tableCellStyles}>{item.product.name}</TableCell>
                <TableCell sx={tableCellStyles}>${item.product.price.toFixed(2)}</TableCell>
                <TableCell sx={tableCellStyles}>{item.quantity}</TableCell>
                <TableCell sx={tableCellStyles}>
                  ${(item.quantity * item.product.price).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => removeOneProductFromCart(item.product.id)}
                    sx={{ width: '25px', height: '25px', minWidth: '0', padding: '0' }}
                  >
                    -
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                      if (item.quantity < item.product.stock) {
                        addProductToCart(item.product.id);
                      }
                    }}
                    sx={{
                      width: '25px',
                      height: '25px',
                      minWidth: '0',
                      padding: '0',
                      marginLeft: '5px',
                    }}
                  >
                    +
                  </Button>
                  <IconButton
                    size="small"
                    onClick={() => removeProductFromCart(item.product.id)}
                    sx={{ marginLeft: '10px' }}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell sx={tableCellStyles}>
                <strong>Total</strong>
              </TableCell>
              <TableCell sx={tableCellStyles}>
                <strong>${totalAmount.toFixed(2)}</strong>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={4}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ width: '100%' }}
                  onClick={handleCheckout}
                >
                  Comprar
                </Button>
              </TableCell>
              <TableCell colSpan={2}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={clearAllFromCart}
                  sx={{ width: '100%' }}
                >
                  Eliminar todos
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}

      <Snackbar open={errorSnackbarOpen} autoHideDuration={5000} onClose={handleErrorCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ width: '100%', marginTop: '-6%' }}>
        <Alert onClose={handleErrorCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={successSnackbarOpen} autoHideDuration={5000} onClose={handleSuccessCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ width: '100%', marginTop: '-6%' }}>
        <Alert onClose={handleSuccessCloseSnackbar} severity="success" sx={{ width: '100%', textAlign: 'center' }}>
          Compra Realizada con Éxito. Gracias!
        </Alert>
      </Snackbar>

    </TableContainer>
  );
}
