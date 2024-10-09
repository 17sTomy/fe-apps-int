import App from '../App.jsx';
import { LoginPage } from '../pages/LoginPage.jsx';
import { SignupPage } from '../pages/SignupPage.jsx';
import { AuthRoute } from './AuthRoute.jsx';
import { ProfilePage } from '../pages/profile/ProfilePage';
import { ProductsPage } from '../pages/products/ProductsPage';

export default [
  {
    path: '/',
    element: (
      <AuthRoute>
        <App />
      </AuthRoute>
    ),
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
