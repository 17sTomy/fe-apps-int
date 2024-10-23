import { useSelector } from 'react-redux';
import { RestrictedPage } from '../RestrictedPage';
import { Navigate } from 'react-router-dom';
import { DashboardLayout } from '../../template/DashboardLayout';
import Table from '../../components/common/Table/Table';
import { useEffect, useState } from 'react';
import { getRegisteredUsers } from '../../services/customerService';
import dayjs from 'dayjs';

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
  const edadConvertida = dayjs(edad, 'YYYYMMDD');
  const edadReal = dayjs().diff(edadConvertida, 'year');

  return {
    id,
    email,
    nombre,
    apellido,
    edad: edad && edadReal,
    kycStatus,
    isAdmin: isAdmin.toString(),
  };
}

export const UserManagementPage = () => {
  const accountStore = useSelector((state) => state.account);

  if (!accountStore.authenticated) {
    return <RestrictedPage />;
  } else if (!accountStore.accountInfo.isAdmin) {
    return <Navigate to="/productos" />;
  }

  const [customerList, setCustomerList] = useState([]);

  const handleDeletion = async (item) => {
    // Iterar sobre cada uno y eliminar
    console.warn('Eliminar ', itemId);
  };

  const handleAdminStatus = async (item) => {
    console.warn('Alternar permisos de admin sobre ', item);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await getRegisteredUsers();
        const processedList = [];

        for (const customer of list) {
          processedList.push(
            createData(
              customer.id,
              customer.email,
              customer.firstname,
              customer.lastname,
              customer.dateOfBirth,
              customer.kycStatus,
              customer.isAdmin
            )
          );
        }

        setCustomerList(processedList);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <h1>Gestión de Usuarios</h1>

      <div style={{ marginTop: 48 }}>
        <Table
          headCells={headCells}
          rows={customerList}
          handleDeletion={(item) => handleDeletion(item)}
          handleAdminStatus={(item) => handleAdminStatus(item)}
        />
      </div>
    </DashboardLayout>
  );
};
