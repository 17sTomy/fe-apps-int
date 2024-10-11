import { useState } from 'react';
import { DashboardLayout } from '../../template/DashboardLayout/DashboardLayout';
import { AllProductsSection } from '../../components/Product/AllProductsSection';
import { FeaturedProductsSection } from '../../components/Product/FeaturedProductsSection';
import { ByCategoryProductsSection } from '../../components/Product/ByCategoryProductsSection';
import { ViewedProductsSection } from '../../components/Product/ViewedProductsSection';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function BasicButtons({ selectedButton, handleButtonClick }) {
  return (
    <Stack spacing={2} direction="row" justifyContent="center" sx={{ marginBottom: 2 }}>
      <Button
        variant={selectedButton === 'todos' ? 'contained' : 'outlined'}
        onClick={() => handleButtonClick('todos')}
      >
        Todos
      </Button>
      <Button
        variant={selectedButton === 'destacados' ? 'contained' : 'outlined'}
        onClick={() => handleButtonClick('destacados')}
      >
        Destacados
      </Button>
      <Button
        variant={selectedButton === 'categorias' ? 'contained' : 'outlined'}
        onClick={() => handleButtonClick('categorias')}
      >
        Categorías
      </Button>
      <Button
        variant={selectedButton === 'vistos' ? 'contained' : 'outlined'}
        onClick={() => handleButtonClick('vistos')}
      >
        Vistos
      </Button>
    </Stack>
  );
}

export const ProductsPage = () => {
  const [selectedButton, setSelectedButton] = useState('todos'); 

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const renderSection = () => {
    switch (selectedButton) {
      case 'todos':
        return <AllProductsSection />;
      case 'destacados':
        return <FeaturedProductsSection />;
      case 'categorias':
        return <ByCategoryProductsSection />;
      case 'vistos':
        return <ViewedProductsSection />;
      default:
        return <AllProductsSection />;
    }
  };

  return (
    <DashboardLayout>
      <BasicButtons selectedButton={selectedButton} handleButtonClick={handleButtonClick} />
      {renderSection()}
    </DashboardLayout>
  );
};
