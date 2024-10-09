import { LoginPage } from '../pages/LoginPage.jsx';
import { SignupPage } from '../pages/SignupPage.jsx';
import { AuthRoute } from './AuthRoute.jsx';
import { ProfilePage } from '../pages/profile/ProfilePage';
import { ProductsPage } from '../pages/products/ProductsPage';
import { Navigate } from 'react-router-dom';

export default [
  {
    path: '/',
    element: <Navigate to="/productos"></Navigate>,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/productos',
    element: <ProductsPage />,
  },
];
