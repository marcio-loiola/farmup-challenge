import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Alert,
  CircularProgress,
  Box,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ClientForm = ({ addClient }) => {
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const handleClickOpen = () => {
    setOpen(true);
    setError("");
  };

  const handleClose = () => {
    setOpen(false);
    setClient({ nome: "", email: "", telefone: "", cidade: "" });
    setError("");
  };

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
    setError("");
  };

  const isFormValid = () => {
    return (
      client.nome.trim() &&
      client.email.trim() &&
      client.telefone.trim() &&
      client.cidade.trim()
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await addClient(client);
      handleClose();
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Este e-mail já está cadastrado");
      } else {
        setError("Erro ao cadastrar cliente");
      }
    } finally {
      setLoading(false);
    }
  };

  // Desktop: renderiza como card
  if (isDesktop) {
    return (
      <Paper
        elevation={2}
        sx={{
          padding: "24px",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          height: "fit-content",
          position: "sticky",
          top: "24px",
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
          size="large"
          fullWidth
          sx={{
            padding: "12px",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          Adicionar Cliente
        </Button>

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
              {loading ? <CircularProgress size={20} /> : "Salvar"}
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }

  // Mobile: renderiza com Fab flutuante
  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          width: 56,
          height: 56,
          zIndex: 1000,
        }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
          Cadastrar Novo Cliente
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 2, md: 3 } }}>
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
            {loading ? <CircularProgress size={20} /> : "Salvar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClientForm;
