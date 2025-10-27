import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

const ContentWrapper = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: isMobile ? "12px" : isTablet ? "16px" : "24px",
        gap: isMobile ? "12px" : "16px",
        overflow: "auto",
        maxWidth: "100%",
      }}
    >
      {children}
    </Box>
  );
};

export default ContentWrapper;
