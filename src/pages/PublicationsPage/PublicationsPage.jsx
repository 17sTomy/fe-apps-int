import { DashboardLayout } from '../../template/DashboardLayout';
import { useSelector } from 'react-redux';
import { RestrictedPage } from '../RestrictedPage';
import { AnimatedView } from '../../components/common/AnimatedElements/AnimatedView';
import useProducts from '../../hooks/useProducts';
import { getAllProducts } from '../../services/productsService';
import { MaterialLoader } from '../../components/common/Loader/MaterialLoader';
import { Box } from '@mui/material';
import ProductCard from '../../components/Product/ProductCard';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useEffect, useState } from 'react';
import './PublicationsPage.styles.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { motion } from 'framer-motion';

export const PublicationsPage = () => {
  const accountStore = useSelector((state) => state.account);

  if (!accountStore.authenticated) {
    return <RestrictedPage />;
  } else if (!accountStore.accountInfo.isAdmin) {
    return <Navigate to="/productos" />;
  }

  const navigate = useNavigate();

  const { products, loading } = useProducts(getAllProducts);
  const { theme } = useTheme();

  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [filterQuery, setFilterQuery] = useState('');

  const applyFilterQuery = (query) => {
    if (!query) {
      setFilteredProducts([...products]);
      return;
    }

    const filteredList = products.filter((product) => {
      const filterByQuery = product.name.toLowerCase().includes(query.toLowerCase());
      const filterByCreator = product.createdByEmail === accountStore.accountInfo.email;
      return filterByQuery && filterByCreator;
    });

    setFilteredProducts(filteredList);
  };

  const handleInputChange = (e) => {
    setFilterQuery(e.target.value);
    applyFilterQuery(e.target.value);
  };

  useEffect(() => {
    applyFilterQuery();
  }, [products]);

  return (
    <DashboardLayout>
      <AnimatedView orientation="horizontal">
        {loading ? (
          <MaterialLoader />
        ) : (
          <div className="products-container">
            <h1>Mis publicaciones</h1>
            <div
              style={{
                marginTop: 16,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 24,
              }}>
              <TextField
                id="outlined-basic"
                label="Buscar por nombre"
                variant="outlined"
                value={filterQuery}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                sx={{
                  width: 300,
                  '& .MuiOutlinedInput-root': {
                    color: theme.secondary,
                    // Class for the border around the input field
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.secondary,
                    },
                  },
                  // Class for the label of the input field
                  '& .MuiInputLabel-outlined': {
                    color: theme.secondary,
                  },
                }}
              />

              <motion.div
                whileHover={{
                  rotate: 90,
                  scale: 1.1,
                }}
                style={{
                  cursor: 'pointer',
                  background: 'green',
                  width: 40,
                  height: 40,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: '100%',
                }}
                onClick={() => navigate('/crear')}>
                <Add fontSize="large" sx={{ color: '#fff' }} />
              </motion.div>
            </div>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'center',
                marginTop: 2,
              }}>
              {filteredProducts.map((product) => (
                <Box key={product.id}>
                  <ProductCard product={product} modifier />
                </Box>
              ))}
            </Box>
          </div>
        )}
      </AnimatedView>
    </DashboardLayout>
  );
};
