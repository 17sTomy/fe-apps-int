import React, { useEffect, useState } from 'react';
import './dashboard.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHouse,
  faCartShopping,
  faReceipt,
  faX,
  faUser,
  faSun,
  faMoon,
  faFolder,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const routes = [
  {
    path: '/productos',
    label: 'Productos',
    icon: faHouse,
  },
  {
    path: '/carrito',
    label: 'Carrito',
    icon: faCartShopping,
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
];

export const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(true);

  const toggle = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    document.body.style.background = theme.primary;
    document.body.style.color = theme.secondary;
  }, [theme]);

  return (
    <div className="dashboard-layout">
      <div className="top-bar" style={{ background: theme.primary, color: theme.secondary }}>
        <div className="left-container">
          <div className="menu-btn">
            <FontAwesomeIcon icon={menuOpen ? faX : faBars} size="xl" onClick={toggle} />
          </div>
          <p style={{ color: theme.accent }}>BlackNuster</p>
        </div>
        <div className="right-container">
          <FontAwesomeIcon
            icon={theme.name === 'dark' ? faMoon : faSun}
            size="xl"
            color={theme.accent}
            onClick={toggleTheme}
          />
        </div>
      </div>

      <div
        className={`side-bar ${menuOpen ? 'open' : ''}`}
        style={{ background: theme.primary, color: theme.secondary }}>
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
                <FontAwesomeIcon icon={route.icon} size="xl" />
              </div>
              <p>{route.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="content"
        style={{
          position: 'absolute',
          top: '70px',
          left: menuOpen ? '250px' : '0px',
        }}>
        {children}
      </div>
    </div>
  );
};
