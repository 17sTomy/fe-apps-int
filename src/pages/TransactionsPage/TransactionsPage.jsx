import { DashboardLayout } from '../../template/DashboardLayout';
import { useSelector } from 'react-redux';
import { RestrictedPage } from '../RestrictedPage';

export const TransactionsPage = () => {
  const accountStore = useSelector((state) => state.account);

  if (!accountStore.authenticated) {
    return <RestrictedPage />;
  }

  return (
    <DashboardLayout>
      <h1>Mis compras - Historial de Transacciones</h1>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            {`ID: ${transaction.id} - Monto: $${transaction.amount} - Fecha: ${transaction.date}`}
          </li>
        ))}
      </ul>
    </DashboardLayout>
  );
};
