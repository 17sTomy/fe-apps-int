import { useSelector } from 'react-redux';
import { RestrictedPage } from '../RestrictedPage';
import { DashboardLayout } from '../../template/DashboardLayout';
import { Navigate, useNavigate } from 'react-router-dom';
import { CustomBox } from '../../components/common/CustomBox/CustomBox';
import './ManagementPage.styles.scss';

export const ManagementPage = () => {
  const accountStore = useSelector((state) => state.account);

  if (!accountStore.authenticated) {
    return <RestrictedPage />;
  } else if (!accountStore.accountInfo.isAdmin) {
    return <Navigate to="/productos" />;
  }

  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="management-page">
        <div className="actions">
          <CustomBox
            animate
            onClick={() => {
              navigate('/gestionar/usuarios');
            }}>
            Gestionar usuarios
          </CustomBox>

          <CustomBox
            animate
            onClick={() => {
              navigate('/gestionar/usuarios');
            }}>
            Gestionar publicaciones
          </CustomBox>

          <CustomBox animate>Proximamente...</CustomBox>
        </div>
      </div>
    </DashboardLayout>
  );
};
