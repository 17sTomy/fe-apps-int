import React, { useEffect } from 'react';
import { useTransaction } from '../../hooks/useTransaction';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '../../hooks/useTheme';

const TransactionHistory = () => {
  const { transactions, loading, error } = useTransaction();
  const { theme } = useTheme();

  const tableCellStyles = {
    color: theme.name === 'dark' ? 'white' : 'black',
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={tableCellStyles}>ID</TableCell>
            <TableCell sx={tableCellStyles}>Cliente</TableCell>
            <TableCell sx={tableCellStyles}>Fecha</TableCell>
            <TableCell sx={tableCellStyles}>Monto (USD)</TableCell>
            <TableCell sx={tableCellStyles}>Monto (ARS)</TableCell>
            <TableCell sx={tableCellStyles}>Items</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(transaction => (
            <TableRow key={transaction.id}>
              <TableCell sx={tableCellStyles}>{transaction.id}</TableCell>
              <TableCell sx={tableCellStyles}>{transaction.customerInfo.email}</TableCell>
              <TableCell sx={tableCellStyles}>{transaction.date.toString()}</TableCell>
              <TableCell sx={tableCellStyles}>U$D {transaction.amountUSD}</TableCell>
              <TableCell sx={tableCellStyles}>$ {transaction.amountARS}</TableCell>
              {/* <TableCell sx={tableCellStyles}>
                {transaction.items.map(item => (
                  <div key={item.id}>
                    {item.description} (x{item.quantity})
                  </div>
                ))}
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionHistory;

