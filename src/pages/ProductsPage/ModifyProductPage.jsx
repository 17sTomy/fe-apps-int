import { DashboardLayout } from '../../template/DashboardLayout/DashboardLayout';
import { AnimatedView } from '../../components/common/AnimatedElements/AnimatedView';
import { ModifyProductSection } from '../../components/Product/ModifyProductSection';
import { useSelector } from 'react-redux';
import { RestrictedPage } from '../RestrictedPage';
import { Navigate } from 'react-router-dom';
import * as React from 'react';

export const ModifyProductPage = () => {
  const accountStore = useSelector((state) => state.account);

  if (!accountStore.authenticated) {
    return <RestrictedPage />;
  } else if (!accountStore.accountInfo.isAdmin) {
    return <Navigate to="/productos" />;
  }

  return (
    <DashboardLayout>
      <AnimatedView orientation="horizontal" direction="inverse">
        <ModifyProductSection />
      </AnimatedView>
    </DashboardLayout>
  );
};
