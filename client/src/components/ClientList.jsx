import React from 'react';
import { List, ListItem, ListItemText, IconButton, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ClientList = ({ clients, deleteClient }) => {
  return (
    <Paper elevation={3} sx={{ mt: 2 }}>
      <Typography variant="h5" component="div" sx={{ p: 2 }}>
        Lista de Clientes
      </Typography>
      <List>
        {clients.map((client) => (
          <ListItem
            key={client.id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => deleteClient(client.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={client.nome}
              secondary={`${client.email} - ${client.telefone} - ${client.cidade}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ClientList;
