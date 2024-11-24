import React, { useEffect, useState, useMemo } from 'react';
import './dashboard.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import {
  faCartShopping,
  faFolder,
  faGear,
  faHouse,
  faReceipt,
  faRightToBracket,
  faUser,
  faHeart,
  faLightbulb, 
  faStar,   
} from '@fortawesome/free-solid-svg-icons';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import { logout } from '../../helpers/authenticationHelper';
import { useDevice } from '../../hooks/useDevice';

export const Sidebar = React.memo(({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { isMobile } = useDevice();
  const accountStore = useSelector((state) => state.account);
  const [cartItemQty, setCartItemQty] = useState(0);

  const routes = useMemo(() => {
    const baseRoutes = [
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
        path: '/favoritos',
        label: 'Favoritos',
        icon: faHeart,
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
      {
        path: '/recomendaciones',
        label: 'Recomendaciones',
        icon: faLightbulb,
      },
      {
        path: '/reseñas',
        label: 'Reseñas',
        icon: faStar,
      }, 
      { path: '/publicaciones', label: 'Publicaciones', icon: faFolder, requiresAdmin: true },
      { path: '/gestionar', label: 'Gestionar sitio', icon: faGear, requiresAdmin: true },
    ];

    return baseRoutes.filter((route) => {
      if (!accountStore.accountInfo?.isAdmin) {
        return !route.requiresAdmin;
      } else {
        return route;
      }
    });
  }, [cartItemQty, accountStore.accountInfo?.isAdmin]);

  useEffect(() => {
    setCartItemQty(accountStore.cart?.quantity);
  }, [accountStore.cart]);

  const handleSessionAction = () => {
    if (accountStore.authenticated) {
      logout(true);
    } else {
      navigate('/login');
    }
  };

  const handleNavigation = (route) => {
    if (isMobile) {
      setMenuOpen(false);
    }
    navigate(route);
  };

  return (
    <div
      className={`side-bar ${menuOpen ? 'open' : ''}`}
      style={{ background: theme.primary, color: theme.secondary }}
    >
      <div className="top-sidebar">
        {routes.map((route, index) => (
          <div className="route" key={index} onClick={() => handleNavigation(route.path)}>
            {route.dividerLabel && (
              <div className="divider">
                <p>{route.dividerLabel}</p>
              </div>
            )}
            <div
              className={`item ${route.path === window.location.pathname && 'active'}`}
              style={{
                background: route.path === window.location.pathname ? theme.accent : theme.primary,
                color:
                  route.path === window.location.pathname
                    ? theme.name === 'dark'
                      ? theme.secondary
                      : theme.primary
                    : theme.secondary,
                borderRadius: route.path === window.location.pathname ? 16 : 0,
              }}
            >
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
});
