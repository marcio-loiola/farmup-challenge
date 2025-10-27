import React from "react";
import { Box, Typography, Link, useTheme, useMediaQuery } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1976d2",
        color: "#ffffff",
        padding: isMobile ? "16px" : "24px",
        marginTop: "auto",
        textAlign: "center",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Box
        sx={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: isMobile ? "12px" : "24px",
        }}
      >
        {/* Informações de autor */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <Typography
            variant={isMobile ? "body2" : "body1"}
            sx={{
              fontWeight: 500,
            }}
          >
            Feito por{" "}
            <Link
              href="https://github.com/marcio-loiola"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: 600,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Márcio Loiola
            </Link>
          </Typography>
          <Typography
            variant="caption"
            sx={{
              opacity: 0.9,
              fontSize: isMobile ? "0.7rem" : "0.75rem",
            }}
          >
            FarmaUP - Gerenciador de Clientes
          </Typography>
        </Box>

        {/* Links úteis */}
        <Box
          sx={{
            display: "flex",
            gap: isMobile ? "12px" : "24px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="https://github.com/marcio-loiola/farmup-challenge"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#ffffff",
              textDecoration: "none",
              fontSize: isMobile ? "0.75rem" : "0.875rem",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Repositório
          </Link>
          <Typography
            variant="caption"
            sx={{
              opacity: 0.8,
              fontSize: isMobile ? "0.75rem" : "0.875rem",
            }}
          >
            •
          </Typography>
          <Typography
            variant="caption"
            sx={{
              opacity: 0.8,
              fontSize: isMobile ? "0.75rem" : "0.875rem",
            }}
          >
            © {currentYear} FarmaUP
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
