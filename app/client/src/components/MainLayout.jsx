import React from "react";
import { Box } from "@mui/material";

const MainLayout = ({ children }) => {
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
      {children}
    </Box>
  );
};

export default MainLayout;
