import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Snackbar,
  Alert,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MainLayout from "./components/MainLayout";
import HeaderWrapper from "./components/HeaderWrapper";
import ClientList from "./components/ClientList";
import ClientForm from "./components/ClientForm";
import api from "./services/api";
import "./App.css";

function App() {
  const [clients, setClients] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const getClients = async () => {
    try {
      const response = await api.get("/clientes");
      setClients(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      showSnackbar("Erro ao carregar clientes", "error");
    }
  };

  const addClient = async (client) => {
    try {
      const response = await api.post("/clientes", client);
      setClients([...clients, response.data]);
      showSnackbar("Cliente cadastrado com sucesso!", "success");
      return response;
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
      throw error;
    }
  };

  const deleteClient = async (id) => {
    try {
      await api.delete(`/clientes/${id}`);
      setClients(clients.filter((client) => client.id !== id));
      showSnackbar("Cliente removido com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      showSnackbar("Erro ao remover cliente", "error");
    }
  };

  useEffect(() => {
    getClients();
    // getClients is stable and does not depend on changing props or state; safe to disable exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      <CssBaseline />
      <HeaderWrapper>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: isDesktop ? "row" : "column",
            gap: isDesktop ? "24px" : "16px",
            padding: isDesktop ? "24px" : "16px",
            overflow: "auto",
            maxWidth: isDesktop ? "1400px" : "100%",
            margin: "0 auto",
            width: "100%",
            boxSizing: "border-box",
            justifyContent: "flex-start",
            alignItems: isDesktop ? "flex-start" : "stretch",
          }}
        >
          <Box
            sx={{
              flex: isDesktop ? "1 1 65%" : "1 1 100%",
              display: "flex",
              flexDirection: "column",
              overflow: isDesktop ? "hidden" : "visible",
            }}
          >
            <ClientList clients={clients} deleteClient={deleteClient} />
          </Box>

          <Box
            sx={{
              flex: isDesktop ? "1 1 35%" : "1 1 auto",
              display: "flex",
              flexDirection: "column",
              overflow: isDesktop ? "hidden" : "visible",
            }}
          >
            <ClientForm addClient={addClient} />
          </Box>
        </Box>

        {/* Snackbar para feedback global */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </HeaderWrapper>
    </MainLayout>
  );
}

export default App;
