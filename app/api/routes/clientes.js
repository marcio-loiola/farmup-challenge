// Rotas para o recurso de clientes
// Define os endpoints da API

const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Operações CRUD para gerenciamento de clientes
 */

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     description: Retorna a lista de clientes, com suporte a filtros por cidade e nome (recursos bônus)
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: cidade
 *         schema:
 *           type: string
 *         description: Filtrar clientes por cidade (case-insensitive)
 *         example: "São Paulo"
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Busca parcial por nome (case-insensitive)
 *         example: "Maria"
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *             examples:
 *               todos:
 *                 summary: Todos os clientes
 *                 value: [
 *                   {
 *                     "id": 1,
 *                     "nome": "João Silva",
 *                     "email": "joao@exemplo.com",
 *                     "telefone": "(11) 98765-4321",
 *                     "cidade": "São Paulo"
 *                   },
 *                   {
 *                     "id": 2,
 *                     "nome": "Maria Santos", 
 *                     "email": "maria@exemplo.com",
 *                     "telefone": "(21) 91234-5678",
 *                     "cidade": "Rio de Janeiro"
 *                   }
 *                 ]
 *               filtrado:
 *                 summary: Filtrado por cidade
 *                 value: [
 *                   {
 *                     "id": 1,
 *                     "nome": "João Silva",
 *                     "email": "joao@exemplo.com", 
 *                     "telefone": "(11) 98765-4321",
 *                     "cidade": "São Paulo"
 *                   }
 *                 ]
 */
router.get('/', clientesController.listarClientes);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Busca um cliente por ID
 *     description: Retorna os dados de um cliente específico
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do cliente
 *         example: 1
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               erro: "Cliente não encontrado"
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               erro: "ID inválido"
 */
router.get('/:id', clientesController.buscarCliente);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     description: Adiciona um novo cliente ao sistema. Email deve ser único (recurso bônus)
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClienteInput'
 *           example:
 *             nome: "Ana Costa"
 *             email: "ana@teste.com"
 *             telefone: "(11) 99999-8888"
 *             cidade: "São Paulo"
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Dados inválidos - campos obrigatórios não preenchidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               erro: "Todos os campos são obrigatórios"
 *       409:
 *         description: Email já cadastrado (recurso bônus)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "E-mail já cadastrado."
 */
router.post('/', clientesController.criarCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente existente
 *     description: Modifica os dados de um cliente específico
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do cliente
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClienteInput'
 *           example:
 *             nome: "João Silva Atualizado"
 *             email: "joao.novo@exemplo.com"
 *             telefone: "(11) 98765-4321"
 *             cidade: "São Paulo"
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', clientesController.atualizarCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Remove um cliente
 *     description: Exclui um cliente do sistema
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do cliente
 *         example: 1
 *     responses:
 *       204:
 *         description: Cliente removido com sucesso (sem conteúdo)
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', clientesController.removerCliente);

module.exports = router;
