import { DashboardLayout } from '../../template/DashboardLayout';
import TransactionHistory from '../../components/Transaction/TransactionHistory';

export const TransactionsPage = () => {
  return (
    <DashboardLayout>
      <TransactionHistory />
    </DashboardLayout>
  );
};
