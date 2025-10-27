import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

/**
 * MainContent - Wrapper para o conteúdo principal (tag <main>)
 *
 * Responsabilidades:
 * - Atua como <main> semântico da aplicação
 * - Gerencia layout responsivo entre ClientList e ClientForm
 * - Distribuição flexível de espaço
 * - Comportamento diferente em desktop e mobile
 */
const MainContent = ({ children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: isDesktop ? "row" : "column",
        gap: isDesktop ? "24px" : "16px",
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      {children}
    </Box>
  );
};

export default MainContent;
