import { useState, useEffect } from 'react';
import {
  getTransactions as fetchTransactions,
  getTransactionById as fetchTransactionById,
  checkout as performCheckout,
} from '../services/transactionService';

export const useTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTransactions();
      setTransactions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTransactionById(id);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkout = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await performCheckout();
      return data;
    } catch (err) {
      throw new Error('Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return {
    transactions,
    loading,
    error,
    getTransactions,
    getTransactionById,
    checkout,
  };
};
