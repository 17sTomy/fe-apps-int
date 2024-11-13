import { useState, useEffect } from 'react';

const useProducts = (fetchFunction, param = '') => {
  const [nameQuery, setNameQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchFunction(param);
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [param]);

  const filterProducts = () => {
    if (!nameQuery) {
      setFilteredProducts([...products]);
    }
    setFilteredProducts(
      products.filter((product) => product?.name?.toLowerCase()?.includes(nameQuery?.toLowerCase()))
    );
  };

  useEffect(() => {
    filterProducts();
  }, [nameQuery]);

  return { products, filteredProducts, loading, error, nameQuery, setNameQuery };
};

export default useProducts;
