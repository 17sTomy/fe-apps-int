import { useSelector } from 'react-redux';
import { RestrictedPage } from '../RestrictedPage';
import { DashboardLayout } from '../../template/DashboardLayout';
import { Navigate, useNavigate } from 'react-router-dom';
import { CustomBox } from '../../components/common/CustomBox/CustomBox';
import { Button } from '@mui/material';
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
        <div className="actions" style={{ display: 'flex', flexDirection: 'column' }}>
          <Button
            sx={{ width: '30%' }}
            variant="contained"
            animate
            onClick={() => {
              navigate('/gestionar/usuarios');
            }}
          >
            Gestionar usuarios
          </Button>

          <Button
            sx={{ width: '30%' }}
            variant="contained"
            animate
            onClick={() => {
              navigate('/publicaciones');
            }}
          >
            Gestionar publicaciones
          </Button>

          <Button variant="contained" sx={{ width: '30%' }} animate>
            Proximamente...
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};
