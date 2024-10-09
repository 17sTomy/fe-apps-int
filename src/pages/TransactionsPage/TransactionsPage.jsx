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
      <h1>Mis compras</h1>
    </DashboardLayout>
  );
};
