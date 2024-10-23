import { useEffect, useState } from 'react';
import { getTransactions } from '../services/transactionService';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.date}: {transaction.amountUSD} USD / {transaction.amountARS} ARS
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
