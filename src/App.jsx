import { useDispatch, useSelector } from 'react-redux';
import DashboardLayoutBasic from './pages/DashboardLayout.jsx';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <DashboardLayoutBasic />
    </>
  );
}

export default App;
