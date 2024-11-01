import { DashboardLayout } from '../../template/DashboardLayout';
import TransactionHistory from '../../components/Transaction/TransactionHistory';
import { RestrictedPage } from '../RestrictedPage';
import React from 'react';
import { useSelector } from 'react-redux';

export const TransactionsPage = () => {
  const accountStore = useSelector((state) => state.account);

  if (!accountStore.authenticated) {
    return <RestrictedPage />;
  }

  return (
    <DashboardLayout>
      <TransactionHistory />
    </DashboardLayout>
  );
};
