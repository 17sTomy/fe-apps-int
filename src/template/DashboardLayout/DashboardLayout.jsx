import React, { useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Sidebar, Topbar, Content } from './';
import './dashboard.styles.scss';
import { useDevice } from '../../hooks/useDevice';
import { CustomSnackbar } from '../../components/common/CustomSnackbar/CustomSnackbar';

export const DashboardLayout = React.memo(({ children }) => {
  const { theme } = useTheme();
  const { isMobile } = useDevice();
  const [menuOpen, setMenuOpen] = useState(!isMobile);

  useEffect(() => {
    document.body.style.background = theme.primary;
    document.body.style.color = theme.secondary;
  }, [theme]);

  return (
    <div className="dashboard-layout">
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Content menuOpen={menuOpen} children={children} />
      <CustomSnackbar />
    </div>
  );
});
