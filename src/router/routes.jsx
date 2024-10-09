import { LoginPage } from '../pages/LoginPage.jsx';
import { SignupPage } from '../pages/SignupPage.jsx';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { ProductsPage } from '../pages/ProductsPage/ProductsPage';
import { Navigate } from 'react-router-dom';
import { OptionalAuthRoute } from './OptionalAuthRoute';
import { CartPage } from '../pages/CartPage/CartPage';

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
    element: (
      <OptionalAuthRoute>
        <ProfilePage />
      </OptionalAuthRoute>
    ),
  },
  {
    path: '/productos',
    element: (
      <OptionalAuthRoute>
        <ProductsPage />
      </OptionalAuthRoute>
    ),
  },
  {
    path: '/carrito',
    element: (
      <OptionalAuthRoute>
        <CartPage />
      </OptionalAuthRoute>
    ),
  },
];
