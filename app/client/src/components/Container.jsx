import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

/**
 * Container - Wrapper para o corpo da aplicação (tag <body>)
 *
 * Responsabilidades:
 * - Atua como <body> semântico da aplicação
 * - Gerencia padding e espaçamento geral
 * - Distribuição de espaço entre conteúdo e footer
 * - Responsividade de espaçamento
 */
const Container = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="body"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: isMobile ? "16px" : "24px",
        gap: "24px",
        overflow: "auto",
        boxSizing: "border-box",
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
