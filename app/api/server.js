// Servidor principal da API REST de Clientes
// Configuração do Express e inicialização do servidor

const express = require('express');
const cors = require('cors');
const clientesRoutes = require('./routes/clientes');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware para CORS (permitir requisições do cliente React)
app.use(cors({
  origin: 'http://localhost:3000', // Porta padrão do React
  credentials: true
}));

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Rota raiz para verificar se a API está funcionando
app.get('/', (req, res) => {
  res.json({ 
    mensagem: 'API de Clientes - FarmUp Challenge',
    endpoints: {
      listar: 'GET /clientes',
      buscar: 'GET /clientes/:id',
      criar: 'POST /clientes',
      atualizar: 'PUT /clientes/:id',
      remover: 'DELETE /clientes/:id'
    }
  });
});

// Registra as rotas de clientes
app.use('/clientes', clientesRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Use Ctrl+C para parar o servidor');
});
