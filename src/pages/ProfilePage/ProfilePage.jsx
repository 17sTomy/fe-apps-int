import { DashboardLayout } from '../../template/DashboardLayout';
import { useSelector } from 'react-redux';
import { RestrictedPage } from '../RestrictedPage';

export const ProfilePage = () => {
  const accountStore = useSelector((state) => state.account);

  if (!accountStore.authenticated) {
    return <RestrictedPage />;
  }

  return (
    <DashboardLayout>
      <h1>Mi perfil</h1>
    </DashboardLayout>
  );
};
