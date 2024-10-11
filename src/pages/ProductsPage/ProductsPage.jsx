import { DashboardLayout } from '../../template/DashboardLayout/DashboardLayout';
import useProducts from '../../hooks/useProducts';

export const ProductsPage = () => {
  const { products, loading, error } = useProducts();

  return (
    <DashboardLayout>
      <h1>Nuestros productos</h1>

      {loading && <p>Loading...</p>} 
      
      {error && <p>Error fetching products: {error.message}</p>}

      {!loading && !error && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </DashboardLayout>
  );
};
