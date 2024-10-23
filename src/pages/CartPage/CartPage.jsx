import { DashboardLayout } from '../../template/DashboardLayout';
import { useSelector } from 'react-redux';
import { RestrictedPage } from '../RestrictedPage';
import CartTable from '../../components/Cart/CartTable';
import { AnimatedView } from '../../components/common/AnimatedElements/AnimatedView';

export const CartPage = () => {
  const accountStore = useSelector((state) => state.account);

  if (!accountStore.authenticated) {
    return <RestrictedPage />;
  }

  return (
    <DashboardLayout>
      <AnimatedView orientation="horizontal">
        <CartTable />
      </AnimatedView>
    </DashboardLayout>
  );
};
