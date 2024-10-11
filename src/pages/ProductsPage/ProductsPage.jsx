import { DashboardLayout } from '../../template/DashboardLayout/DashboardLayout';
import useProducts from '../../hooks/useProducts';
import ProductCard from '../../components/Product/ProductCard';
import { Box } from '@mui/material'; 

export const ProductsPage = () => {
  const { products, loading, error } = useProducts();

  return (
    <DashboardLayout>
      <h1>Nuestros productos</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Error fetching products: {error.message}</p>}

      {!loading && !error && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2, 
            justifyContent: 'center'
          }}
        >
          {products.map((product) => (
            <Box key={product.id} >
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
      )}
    </DashboardLayout>
  );
};
