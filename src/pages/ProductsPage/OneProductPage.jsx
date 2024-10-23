import { DashboardLayout } from '../../template/DashboardLayout/DashboardLayout';
import { OneProductSection } from '../../components/Product/OneProductSection';
import { AnimatedView } from '../../components/common/AnimatedElements/AnimatedView';

export const OneProductPage = () => {
  return (
    <DashboardLayout>
      <AnimatedView orientation="horizontal" direction="inverse">
        <OneProductSection />
      </AnimatedView>
    </DashboardLayout>
  );
};
