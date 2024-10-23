import { useSelector } from 'react-redux';
import { RestrictedPage } from '../RestrictedPage';
import { Navigate } from 'react-router-dom';
import { DashboardLayout } from '../../template/DashboardLayout';
import Table from '../../components/common/Table/Table';

const headCells = [
  {
    id: 'email',
    numeric: false,
    disablePadding: true,
    label: 'Email',
  },
  {
    id: 'nombre',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'apellido',
    numeric: false,
    disablePadding: false,
    label: 'Apellido',
  },
  {
    id: 'edad',
    numeric: false,
    disablePadding: false,
    label: 'Edad',
  },
  {
    id: 'KycStatus',
    numeric: false,
    disablePadding: false,
    label: 'KycStatus',
  },
  {
    id: 'isAdmin',
    numeric: false,
    disablePadding: false,
    label: 'isAdmin',
  },
];

function createData(id, email, nombre, apellido, edad, kycStatus, isAdmin) {
  return {
    id,
    email,
    nombre,
    apellido,
    edad,
    kycStatus,
    isAdmin,
  };
}

const rows = [
  createData(1, 'Cupcake', 305, 3.7, 67, 4.3, 'true'),
  createData(2, 'Donut', 452, 25.0, 51, 4.9, 'false'),
  createData(3, 'Eclair', 262, 16.0, 24, 6.0, 'false'),
  createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0, 'true'),
  createData(5, 'Gingerbread', 356, 16.0, 49, 3.9, 'false'),
  createData(6, 'Honeycomb', 408, 3.2, 87, 6.5, 'false'),
  createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3, 'false'),
  createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0, 'false'),
  createData(9, 'KitKat', 518, 26.0, 65, 7.0, 'false'),
  createData(10, 'Lollipop', 392, 0.2, 98, 0.0, 'true'),
  createData(11, 'Marshmallow', 318, 0, 81, 2.0, 'false'),
  createData(12, 'Nougat', 360, 19.0, 9, 37.0, 'false'),
  createData(13, 'Oreo', 437, 18.0, 63, 4.0, 'true'),
];

export const UserManagementPage = () => {
  const accountStore = useSelector((state) => state.account);

  if (!accountStore.authenticated) {
    return <RestrictedPage />;
  } else if (!accountStore.accountInfo.isAdmin) {
    return <Navigate to="/productos" />;
  }

  const handleDeletion = async (item) => {
    console.warn('Eliminar ', item);
  };

  const handleAdminStatus = async (item) => {
    console.warn('Alternar permisos de admin sobre ', item);
  };

  return (
    <DashboardLayout>
      <h1>Gestión de Usuarios</h1>

      <div style={{ marginTop: 48 }}>
        <Table
          headCells={headCells}
          rows={rows}
          handleDeletion={(item) => handleDeletion(item)}
          handleAdminStatus={(item) => handleAdminStatus(item)}
        />
      </div>
    </DashboardLayout>
  );
};
