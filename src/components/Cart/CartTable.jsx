import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import { useCart } from '../../hooks/useCart';
import MovieIcon from '@mui/icons-material/Movie';

export default function CartTable() {
  const cart = useSelector((state) => state.account.cart);
  const { addProductToCart, removeOneProductFromCart, removeProductFromCart, clearAllFromCart } = useCart();
  const { theme } = useTheme();

  const tableCellStyles = {
    color: theme.name === 'dark' ? 'white' : 'black', 
  };

  return (
    <TableContainer>
      {cart?.cartItems?.length === 0 ? (
        <>
          <h1 style={{ textAlign: 'center', marginTop: '20px' }}>No Hay Productos en el Carrito</h1>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button variant="contained" color="primary" component={Link} to="/productos" sx={{ margin: 'auto' }}>
              Comprar Ahora <MovieIcon/>
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
                    onClick={() => addProductToCart(item.product.id)}
                    sx={{ width: '25px', height: '25px', minWidth: '0', padding: '0', marginLeft: '5px' }}
                  >
                    +
                  </Button>
                  <IconButton
                    size="small"
                    onClick={() => removeProductFromCart(item.product.id)}
                    sx={{ marginLeft: '10px' }}
                    color='error'
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4}>
                <Button  variant="contained" color="primary" sx={{ width: '100%' }}>
                  Comprar
                </Button>
              </TableCell>
              <TableCell colSpan={1}>
                <Button variant="contained" color="error" onClick={clearAllFromCart} sx={{ width: '100%' }}>
                  Eliminar todos
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
