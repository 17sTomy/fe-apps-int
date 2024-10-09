import App from '../App.jsx';
import { LoginPage } from '../pages/LoginPage.jsx';
import { SignupPage } from '../pages/SignupPage.jsx';
import { AuthRoute } from './AuthRoute.jsx';
import DashboardLayoutBasic from '../pages/DashboardLayout.jsx';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import ProductsPage from '../pages/ProductsPage/ProductsPage';
import CartPage from '../pages/CartPage/CartPage.jsx';

export default [
  {
    path: '/',
    element: <DashboardLayoutBasic Children={<ProductsPage />} />,
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
    element: <DashboardLayoutBasic Children={<ProfilePage />} />,
  },
  {
    path: '/cart',
    element: <DashboardLayoutBasic Children={<CartPage />} />,
  },
];
