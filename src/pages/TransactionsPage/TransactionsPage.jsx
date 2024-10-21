import { DashboardLayout } from '../../template/DashboardLayout';
import { useSelector } from 'react-redux';
import { RestrictedPage } from '../RestrictedPage';
import { getTransactions } from '../../services/transactionService';

export const TransactionsPage = () => {
  const accountStore = useSelector((state) => state.account);

  if (!accountStore.authenticated) {
    return <RestrictedPage />;
  }
  
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions();
        setTransactions(response.data);
      } catch (error) {
        console.error('Error obteniendo transacciones:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <DashboardLayout>
      <h1>Mis compras - Historial de Transacciones</h1>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            {`ID: ${transaction.id} - Monto: $${transaction.amount} - Fecha: ${transaction.date}`}
          </li>
        ))}
      </ul>
    </DashboardLayout>
  );
};
