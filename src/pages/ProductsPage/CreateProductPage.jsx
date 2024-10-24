import { DashboardLayout } from '../../template/DashboardLayout';
import { AnimatedView } from '../../components/common/AnimatedElements/AnimatedView';
import { useSelector } from 'react-redux';
import { RestrictedPage } from '../RestrictedPage';
import { Navigate } from 'react-router-dom';
import * as React from 'react';
import { CreateProductSection } from '../../components/Product/CreateProductSection';

export const CreateProductPage = () => {
  const accountStore = useSelector((state) => state.account);

  if (!accountStore.authenticated) {
    return <RestrictedPage />;
  } else if (!accountStore.accountInfo.isAdmin) {
    return <Navigate to="/productos" />;
  }

  return (
    <DashboardLayout>
      <AnimatedView orientation="horizontal" direction="inverse">
        <CreateProductSection />
      </AnimatedView>
    </DashboardLayout>
  );
};
