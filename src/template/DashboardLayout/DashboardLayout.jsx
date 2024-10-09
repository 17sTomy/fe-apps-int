import React, { useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Sidebar, Topbar, Content } from './';
import './dashboard.styles.scss';

export const DashboardLayout = React.memo(({ children }) => {
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(true);

  useEffect(() => {
    document.body.style.background = theme.primary;
    document.body.style.color = theme.secondary;
  }, [theme]);

  return (
    <div className="dashboard-layout">
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Sidebar menuOpen={menuOpen} />
      <Content menuOpen={menuOpen} children={children} />
    </div>
  );
});
