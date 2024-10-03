import * as React from "react";
import PropTypes from "prop-types";
import { createTheme } from "@mui/material/styles";
import Home from "@mui/icons-material/Home";
import FolderShared from "@mui/icons-material/FolderShared";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import HelpIcon from "@mui/icons-material/Help";
import { Box } from "@mui/system";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NAVIGATION = [
  {
    segment: "Productos",
    title: "Productos",
    icon: <Home />,
  },
  {
    segment: "Mis Compras",
    title: "Mis Compras",
    icon: <FolderShared />,
  },
  {
    segment: "Ayuda",
    title: "Ayuda",
    icon: <HelpIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Perfil",
  },
  {
    segment: "MiPerfil",
    title: "Mi Perfil",
    icon: <AccountCircleIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  return (
    <Box
      spacing={2}
      sx={{
        alignItems: "center",
        mx: 3,
        pb: 10,
        mt: { xs: 8, md: -4 },
      }}
    >
      {/* {pathname === "/MiPerfil" ? (
        <MiPerfil />
      ) : pathname === "/proyectos" ? (
        <Proyectos />
      ) : pathname === "/Ayuda" ? (
        <Ayuda />
      ) : (
        <MainGrid />
      )} */}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
  const [pathname, setPathname] = React.useState("/dashboard");

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            {/* Logo del lado izquierdo */}
            {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <NotificationSection />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src="/assets/PayBuddyHomeIcon.png" alt="PayBuddy logo" />
            </Box> */}
  
           
          </Box>
        ),
        title: "BlackNuster",
      }}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
  

}

DashboardLayoutBasic.propTypes = {};

export default DashboardLayoutBasic;
