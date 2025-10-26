import React, { useState, useEffect } from 'react';
import { Container, CssBaseline } from '@mui/material';
import Header from './components/Header';
import ClientList from './components/ClientList';
import ClientForm from './components/ClientForm';
import api from './services/api';
import './App.css';

function App() {
  const [clients, setClients] = useState([]);

  const getClients = async () => {
    try {
      const response = await api.get('/clientes');
      setClients(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const addClient = async (client) => {
    try {
      const response = await api.post('/clientes', client);
      setClients([...clients, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
    }
  };

  const deleteClient = async (id) => {
    try {
      await api.delete(`/clientes/${id}`);
      setClients(clients.filter((client) => client.id !== id));
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
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
    </>
  );
}

export default App;
