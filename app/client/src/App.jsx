import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Snackbar, Alert } from '@mui/material';
import Header from './components/Header';
import ClientList from './components/ClientList';
import ClientForm from './components/ClientForm';
import api from './services/api';
import './App.css';

function App() {
  const [clients, setClients] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const getClients = async () => {
    try {
      const response = await api.get('/clientes');
      setClients(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      showSnackbar('Erro ao carregar clientes', 'error');
    }
  };

  const addClient = async (client) => {
    try {
      const response = await api.post('/clientes', client);
      setClients([...clients, response.data]);
      showSnackbar('Cliente cadastrado com sucesso!', 'success');
      return response; // Retorna resposta para o formulário
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
      // Re-throw para que o formulário possa tratar o erro
      throw error;
    }
  };

  const deleteClient = async (id) => {
    try {
      await api.delete(`/clientes/${id}`);
      setClients(clients.filter((client) => client.id !== id));
      showSnackbar('Cliente removido com sucesso!', 'success');
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      showSnackbar('Erro ao remover cliente', 'error');
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <ClientList clients={clients} deleteClient={deleteClient} />
        <ClientForm addClient={addClient} />
      </Container>
      
      {/* Snackbar para feedback global */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
