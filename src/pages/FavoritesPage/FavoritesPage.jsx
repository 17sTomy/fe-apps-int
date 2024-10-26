import { DashboardLayout } from '../../template/DashboardLayout';
import { useSelector } from 'react-redux';
import { RestrictedPage } from '../RestrictedPage';
import { AnimatedView } from '../../components/common/AnimatedElements/AnimatedView';
import { FavoritesProductsSection } from '../../components/Product/FavoritesProductsSection';

export const FavoritesPage = () => {
  const accountStore = useSelector((state) => state.account);

  if (!accountStore.authenticated) {
    return <RestrictedPage />;
  }

  return (
    <DashboardLayout>
      <AnimatedView orientation="horizontal">
        <FavoritesProductsSection />
      </AnimatedView>
    </DashboardLayout>
  );
};
