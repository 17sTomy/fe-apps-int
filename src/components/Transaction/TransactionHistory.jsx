import { useTransaction } from '../../hooks/useTransaction';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '../../hooks/useTheme';
import useProducts from '../../hooks/useProducts';
import { getAllProducts } from '../../services/productsService';
import { Link } from 'react-router-dom';
import HdIcon from '@mui/icons-material/Hd';

const TransactionHistory = () => {
  const { transactions, loading, error } = useTransaction();
  const { theme } = useTheme();
  const { products } = useProducts(getAllProducts);

  console.log(products)
  const tableCellStyles = {
    color: theme.name === 'dark' ? 'white' : 'black',
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <>
      {transactions?.length === 0 ? (
        <>
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>No Has Realizado Compras</h1>
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
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={tableCellStyles}>ID</TableCell>
                <TableCell sx={tableCellStyles}>Fecha</TableCell>
                <TableCell sx={tableCellStyles}>Productos</TableCell>
                <TableCell sx={tableCellStyles}>Monto Individual</TableCell>
                <TableCell sx={tableCellStyles}>Monto Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell sx={tableCellStyles}>{transaction.id}</TableCell>
                  <TableCell sx={tableCellStyles}>{transaction.date.toString()}</TableCell>
                  <TableCell sx={tableCellStyles}>
                    {transaction.items.map(item => {
                      const product = products.find(p => p.id === item.productId);
                      return (
                        <div key={item.id}>
                          <li>{product ? product.name : "Producto no encontrado"} (x{item.quantity})</li>
                        </div>
                      );
                    })}
                  </TableCell>
                  <TableCell sx={tableCellStyles}>
                    {transaction.items.map(item => {
                      return (
                        <div key={item.id}>
                          <li>${(item.amountUnitARS * item.quantity).toFixed(2)}</li>
                        </div>
                      );
                    })}
                  </TableCell>
                  <TableCell sx={tableCellStyles}>$ {transaction.amountARS}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default TransactionHistory;

