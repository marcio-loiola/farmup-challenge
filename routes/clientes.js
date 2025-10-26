// Rotas para o recurso de clientes
// Define os endpoints da API

const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// GET /clientes - Lista todos os clientes
router.get('/', clientesController.listarClientes);

// GET /clientes/:id - Busca um cliente por ID
router.get('/:id', clientesController.buscarCliente);

// POST /clientes - Cria um novo cliente
router.post('/', clientesController.criarCliente);

// PUT /clientes/:id - Atualiza um cliente
router.put('/:id', clientesController.atualizarCliente);

// DELETE /clientes/:id - Remove um cliente
router.delete('/:id', clientesController.removerCliente);

module.exports = router;
