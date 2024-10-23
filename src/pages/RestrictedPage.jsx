import Button from '@mui/material/Button';
import { DashboardLayout } from '../template/DashboardLayout';
import { useNavigate } from 'react-router-dom';

export const RestrictedPage = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexFlow: 'column nowrap',
          width: '100%',
          height: 'calc(100vh - 70px)',
          gap: 24,
        }}
      >
        <h1>Iniciá sesión</h1>
        <p>Para poder acceder a esta sección, primero debés ingresar a tu cuenta.</p>

        <div className="action" style={{ maxWidth: 250 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate('/login')}
          >
            Iniciar sesión
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate('/signup')}
          >
            Crear cuenta
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};
