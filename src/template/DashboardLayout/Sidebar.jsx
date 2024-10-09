import React, { useEffect, useState } from 'react';
import './dashboard.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import {
  faCartShopping,
  faFolder,
  faHouse,
  faReceipt,
  faRightToBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { logout } from '../../helpers/authenticationHelper';

export const Sidebar = ({ menuOpen }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const accountStore = useSelector((state) => state.account);

  const [routes, setRoutes] = useState([]);
  const [cartItemQty, setCartItemQty] = useState(0);

  useEffect(() => {
    setRoutes([
      {
        path: '/productos',
        label: 'Productos',
        icon: faHouse,
      },
      {
        path: '/carrito',
        label: 'Carrito',
        icon: faCartShopping,
        customIcon: (
          <Badge badgeContent={cartItemQty} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        ),
      },
      {
        path: '/compras',
        label: 'Compras',
        icon: faReceipt,
      },
      {
        dividerLabel: 'Perfil',
        path: '/profile',
        label: 'Mi Perfil',
        icon: faUser,
      },
      { path: '/publicaciones', label: 'Publicaciones', icon: faFolder },
    ]);
  }, [cartItemQty]);

  useEffect(() => {
    setCartItemQty(accountStore.cart?.cartItems?.length);
  }, [accountStore.cart]);

  const handleSessionAction = () => {
    if (accountStore.authenticated) {
      logout();
    } else {
      navigate('/login');
    }
  };

  return (
    <div
      className={`side-bar ${menuOpen ? 'open' : ''}`}
      style={{ background: theme.primary, color: theme.secondary }}>
      <div className="top-sidebar">
        {routes.map((route, index) => (
          <div className="route" key={index} onClick={() => navigate(route.path)}>
            {route.dividerLabel ? (
              <div className="divider">
                <p>{route.dividerLabel}</p>
              </div>
            ) : (
              <></>
            )}
            <div
              className="item"
              style={{
                background: route.path === window.location.pathname ? theme.accent : theme.primary,
                color:
                  route.path === window.location.pathname
                    ? theme.name === 'dark'
                      ? theme.secondary
                      : theme.primary
                    : theme.secondary,
                borderRadius: route.path === window.location.pathname ? 16 : 0,
              }}>
              <div className="icon">
                {route.customIcon ? (
                  route.customIcon
                ) : (
                  <FontAwesomeIcon icon={route.icon} size="xl" />
                )}
              </div>
              <p>{route.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bottom-sidebar">
        <div className="route">
          <div className="divider"></div>
          <div className="item" onClick={handleSessionAction}>
            <div className="icon">
              <FontAwesomeIcon icon={faRightToBracket} size="xl" />
            </div>
            <p>{accountStore.authenticated ? 'Cerrar sesión' : 'Iniciar sesión'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
