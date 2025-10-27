import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1976d2",
        boxShadow: "none",
        width: "100%",
        height: "100%",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          height: "100%",
          paddingLeft: isMobile ? "8px" : isTablet ? "16px" : "24px",
          paddingRight: isMobile ? "8px" : isTablet ? "16px" : "24px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant={isMobile ? "h6" : isTablet ? "h5" : "h4"}
          component="div"
          sx={{
            fontWeight: 600,
            letterSpacing: "0.5px",
            transition: "font-size 0.3s ease-in-out",
          }}
        >
          FarmaUP Clientes
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
