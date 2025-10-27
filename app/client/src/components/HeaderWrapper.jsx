import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Header from "./Header";

/**
 * HeaderWrapper - Componente wrapper responsivo para o Header
 *
 * Características:
 * - Posição fixa na parte superior da tela
 * - Expansivo e responsivo para ocupar a tela inteira
 * - Adaptável a mudanças de design
 * - Suporta diferentes breakpoints de tela
 * - Gerencia padding/margin do conteúdo abaixo
 */
const HeaderWrapper = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Altura dinâmica do header baseada no tamanho da tela
  const headerHeight = isMobile ? "56px" : isTablet ? "64px" : "80px";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Header Wrapper - Fixo no topo */}
      <Box
        component="header"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          width: "100%",
          height: headerHeight,
          boxSizing: "border-box",
          backgroundColor: "#1976d2",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease-in-out",

          // Responsividade avançada
          "@media (max-width: 600px)": {
            height: "56px",
            padding: "0 8px",
          },
          "@media (min-width: 601px) and (max-width: 960px)": {
            height: "64px",
            padding: "0 16px",
          },
          "@media (min-width: 961px)": {
            height: "80px",
            padding: "0 24px",
          },
        }}
      >
        <Header />
      </Box>

      {/* Content Container - Com margem superior para compensar header fixo */}
      <Box
        sx={{
          marginTop: headerHeight,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          boxSizing: "border-box",
          transition: "margin-top 0.3s ease-in-out",

          // Responsividade avançada
          "@media (max-width: 600px)": {
            marginTop: "56px",
          },
          "@media (min-width: 601px) and (max-width: 960px)": {
            marginTop: "64px",
          },
          "@media (min-width: 961px)": {
            marginTop: "80px",
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default HeaderWrapper;
