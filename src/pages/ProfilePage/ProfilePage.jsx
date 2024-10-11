import { DashboardLayout } from '../../template/DashboardLayout';
import { useSelector } from 'react-redux';
import { RestrictedPage } from '../RestrictedPage';
import { Navigate } from 'react-router-dom';

export const ProfilePage = () => {
  const accountStore = useSelector((state) => state.account);

  if (!accountStore.authenticated) {
    return <RestrictedPage />;
  } else if (accountStore.accountInfo.kycStatus !== 'COMPLETED_KYC') {
    return <Navigate to="/kyc" />;
  }

  return (
    <DashboardLayout>
      <h1>Mi perfil</h1>
    </DashboardLayout>
  );
};
