import React, { useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Paper, 
  Typography, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ClientList = ({ clients, deleteClient }) => {
  const [deleteDialog, setDeleteDialog] = useState({ open: false, client: null });

  const handleDeleteClick = (client) => {
    setDeleteDialog({ open: true, client });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.client) {
      deleteClient(deleteDialog.client.id);
    }
    setDeleteDialog({ open: false, client: null });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, client: null });
  };

  return (
    <>
      <Paper elevation={3} sx={{ mt: 2 }}>
        <Typography variant="h5" component="div" sx={{ p: 2 }}>
          Lista de Clientes ({clients.length})
        </Typography>
        {clients.length === 0 ? (
          <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
            Nenhum cliente cadastrado
          </Typography>
        ) : (
          <List>
            {clients.map((client) => (
              <ListItem
                key={client.id}
                secondaryAction={
                  <IconButton 
                    edge="end" 
                    aria-label="delete" 
                    onClick={() => handleDeleteClick(client)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={client.nome}
                  secondary={`📧 ${client.email} | 📱 ${client.telefone} | 📍 ${client.cidade}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {/* Dialog de confirmação */}
      <Dialog open={deleteDialog.open} onClose={handleDeleteCancel}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja remover o cliente <strong>{deleteDialog.client?.nome}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Remover
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClientList;
