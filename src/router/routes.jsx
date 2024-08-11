import App from '../App.jsx';
import { LoginPage } from '../pages/LoginPage.jsx';

export default [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/hello',
    element: <div>Hello world!</div>,
  },
];
