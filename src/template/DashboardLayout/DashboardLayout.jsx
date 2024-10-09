import React, { useState } from 'react';
import './dashboard.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHouse,
  faCartShopping,
  faReceipt,
  faX,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

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
    path: '/profile',
    label: 'Mi Perfil',
    icon: faUser,
  },
];

export const DashboardLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(true);

  const toggle = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      <div className="top-bar">
        <div className="menu-btn">
          <FontAwesomeIcon icon={menuOpen ? faX : faBars} size="xl" onClick={toggle} />
        </div>
        <p>BlackNuster</p>
      </div>

      <div className={`side-bar ${menuOpen ? 'open' : ''}`}>
        {routes.map((route, index) => (
          <div
            className={`route ${route.path === window.location.pathname ? 'active' : ''}`}
            key={index}
            onClick={() => navigate(route.path)}>
            <div className="icon">
              <FontAwesomeIcon icon={route.icon} size="xl" />
            </div>
            {route.label}
          </div>
        ))}
      </div>

      <div
        className="content"
        style={{ position: 'absolute', top: '70px', left: menuOpen ? '250px' : '0px' }}>
        {children}
      </div>
    </div>
  );
};
