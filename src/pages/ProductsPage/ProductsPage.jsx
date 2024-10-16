import { useState } from 'react';
import { DashboardLayout } from '../../template/DashboardLayout/DashboardLayout';
import { AllProductsSection } from '../../components/Product/AllProductsSection';
import { FeaturedProductsSection } from '../../components/Product/FeaturedProductsSection';
import { ByCategoryProductsSection } from '../../components/Product/ByCategoryProductsSection';
import { ViewedProductsSection } from '../../components/Product/ViewedProductsSection';
import NavigationButtons from '../../components/NavigationButtons'

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
      <NavigationButtons selectedButton={selectedButton} handleButtonClick={handleButtonClick} />
      {renderSection()}
    </DashboardLayout>
  );
};
