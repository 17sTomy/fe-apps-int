import { useDispatch, useSelector } from 'react-redux';
import DashboardLayoutBasic from './pages/DashboardLayout.jsx';
import { DashboardLayout } from './template/DashboardLayout/DashboardLayout';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <DashboardLayout>Hola Mundo</DashboardLayout>
    </>
  );
}

export default App;
