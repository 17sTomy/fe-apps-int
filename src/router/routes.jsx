import App from '../App.jsx';
import { LoginPage } from '../pages/LoginPage.jsx';
import { SignupPage } from '../pages/SignupPage.jsx';
import { AuthRoute } from './AuthRoute.jsx';
import { ProductsPage } from '../pages/ProductsPage/ProductsPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';

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
    path: '/products',
    element: <ProductsPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
];
