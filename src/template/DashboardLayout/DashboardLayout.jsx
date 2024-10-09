import React, { useEffect, useState } from 'react';
import './dashboard.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../hooks/useTheme';
import { Sidebar } from './Sidebar';

export const DashboardLayout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(true);

  const toggle = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    document.body.style.background = theme.primary;
    document.body.style.color = theme.secondary;
  }, [theme]);

  const contentStyles =
    window.innerWidth <= 768
      ? {
          position: 'initial',
          left: 'initial',
          marginTop: 60,
        }
      : {
          position: 'absolute',
          left: menuOpen ? '250px' : '0px',
        };

  return (
    <div className="dashboard-layout">
      <div className="top-bar" style={{ background: theme.primary, color: theme.secondary }}>
        <div className="left-container">
          <div className="menu-btn">
            <FontAwesomeIcon icon={menuOpen ? faX : faBars} size="xl" onClick={toggle} />
          </div>
          <p style={{ color: theme.accent }}>BlackNuster</p>
        </div>
        <div className="right-container" style={{ cursor: 'pointer' }}>
          <FontAwesomeIcon
            icon={theme.name === 'dark' ? faMoon : faSun}
            size="xl"
            color={theme.accent}
            onClick={toggleTheme}
          />
        </div>
      </div>

      <Sidebar menuOpen={menuOpen} />

      <div className="content" style={contentStyles}>
        {children}
      </div>
    </div>
  );
};
