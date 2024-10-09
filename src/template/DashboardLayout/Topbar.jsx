import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBarsStaggered, faMoon, faSun, faX } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../hooks/useTheme';
import './dashboard.styles.scss';

export const Topbar = ({ menuOpen, setMenuOpen }) => {
  const { theme, toggleTheme } = useTheme();

  const toggle = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, [setMenuOpen]);

  return (
    <div className="top-bar" style={{ background: theme.primary, color: theme.secondary }}>
      <div className="left-container">
        <div className="menu-btn">
          <FontAwesomeIcon icon={menuOpen ? faBarsStaggered : faBars} size="xl" onClick={toggle} />
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
  );
};
