import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Alert, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ClientForm = ({ addClient }) => {
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState({ nome: '', email: '', telefone: '', cidade: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
    setError(''); // Limpar erro anterior
  };

  const handleClose = () => {
    setOpen(false);
    setClient({ nome: '', email: '', telefone: '', cidade: '' }); // Limpar formulário
    setError('');
  };

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
    setError(''); // Limpar erro ao digitar
  };

  const isFormValid = () => {
    return client.nome.trim() && client.email.trim() && client.telefone.trim() && client.cidade.trim();
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await addClient(client);
      handleClose(); // Fecha e limpa formulário em caso de sucesso
    } catch (err) {
      // Tratamento específico do erro 409 (email duplicado)  
      if (err.response?.status === 409) {
        setError('Este e-mail já está cadastrado');
      } else {
        setError('Erro ao cadastrar cliente');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            name="nome"
            label="Nome *"
            type="text"
            fullWidth
            variant="outlined"
            value={client.nome}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email *"
            type="email"
            fullWidth
            variant="outlined"
            value={client.email}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            margin="dense"
            name="telefone"
            label="Telefone *"
            type="text"
            fullWidth
            variant="outlined"
            value={client.telefone}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            margin="dense"
            name="cidade"
            label="Cidade *"
            type="text"
            fullWidth
            variant="outlined"
            value={client.cidade}
            onChange={handleChange}
            disabled={loading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={loading || !isFormValid()}
          >
            {loading ? <CircularProgress size={20} /> : 'Salvar'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClientForm;
