import React, { useState } from "react";
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
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ClientList = ({ clients, deleteClient }) => {
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    client: null,
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

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
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
          backgroundColor: "#ffffff",
        }}
      >
        <Box
          sx={{
            padding: isMobile
              ? "12px 16px"
              : isTablet
              ? "14px 18px"
              : "16px 20px",
            borderBottom: "1px solid #e0e0e0",
            backgroundColor: "#fafafa",
            flexShrink: 0,
          }}
        >
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            component="div"
            sx={{
              fontWeight: 600,
              color: "#1976d2",
            }}
          >
            📋 Lista de Clientes ({clients.length})
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {clients.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                padding: "24px",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: isMobile ? "0.9rem" : "1rem",
                }}
              >
                Nenhum cliente cadastrado
              </Typography>
            </Box>
          ) : (
            <List sx={{ width: "100%", padding: 0 }}>
              {clients.map((client, index) => (
                <ListItem
                  key={client.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteClick(client)}
                      color="error"
                      size={isMobile ? "small" : "medium"}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  sx={{
                    borderBottom:
                      index < clients.length - 1 ? "1px solid #f0f0f0" : "none",
                    paddingY: isMobile ? "8px" : "12px",
                    paddingX: isMobile ? "12px" : "16px",
                    "&:hover": {
                      backgroundColor: "#f9f9f9",
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: isMobile ? "0.95rem" : "1rem",
                        }}
                      >
                        {client.nome}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          display: isMobile ? "block" : "inline",
                          fontSize: isMobile ? "0.8rem" : "0.875rem",
                          marginTop: isMobile ? "4px" : "0",
                        }}
                      >
                        📧 {client.email}
                        {!isMobile && " | "}
                        {isMobile && <br />}
                        📱 {client.telefone}
                        {!isMobile && " | "}
                        {isMobile && <br />}
                        📍 {client.cidade}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Paper>

      {/* Dialog de confirmação */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja remover o cliente{" "}
            <strong>{deleteDialog.client?.nome}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancelar</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Remover
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClientList;
