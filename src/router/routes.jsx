import { LoginPage } from '../pages/LoginPage.jsx';
import { SignupPage } from '../pages/SignupPage.jsx';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
import { ProductsPage } from '../pages/ProductsPage/ProductsPage';
import { Navigate } from 'react-router-dom';
import { OptionalAuthRoute } from './OptionalAuthRoute';
import { CartPage } from '../pages/CartPage/CartPage';
import { PublicationsPage } from '../pages/PublicationsPage/PublicationsPage';
import { TransactionsPage } from '../pages/TransactionsPage/TransactionsPage';
import { KycPage } from '../pages/KycPage/KycPage';

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
  {
    path: '/publicaciones',
    element: (
      <OptionalAuthRoute>
        <PublicationsPage />
      </OptionalAuthRoute>
    ),
  },
  {
    path: '/compras',
    element: (
      <OptionalAuthRoute>
        <TransactionsPage />
      </OptionalAuthRoute>
    ),
  },
  {
    path: '/kyc',
    element: (
      <OptionalAuthRoute>
        <KycPage />
      </OptionalAuthRoute>
    ),
  },
];
