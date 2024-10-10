import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBarsStaggered, faX, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../hooks/useTheme';
import './dashboard.styles.scss';
import { useDevice } from '../../hooks/useDevice';

export const Topbar = ({ menuOpen, setMenuOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const { isMobile } = useDevice();

  const toggle = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, [setMenuOpen]);

  return (
    <div className="top-bar" style={{ background: theme.primary, color: theme.secondary }}>
      <div className="left-container">
        <div className="menu-btn">
          <FontAwesomeIcon
            icon={menuOpen ? (isMobile ? faX : faBarsStaggered) : faBars}
            size="xl"
            onClick={toggle}
          />
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
