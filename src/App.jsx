import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from './store/slice/counterSlice.js';
import Navbar from './components/Navbar.jsx';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
    </>
  );
}

export default App;
