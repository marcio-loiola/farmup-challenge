// Controlador para gerenciar a lógica de clientes
// Faz a ponte entre as rotas e os dados

const clientesData = require('../data/clientes');

// Valida se todos os campos obrigatórios estão presentes
function validarCampos(nome, email, telefone, cidade) {
  return nome && email && telefone && cidade;
}

// Retorna erro 400 se validação falhar
function erroValidacao(res) {
  return res.status(400).json({ 
    erro: 'Todos os campos são obrigatórios' 
  });
}

// Retorna erro 404 se cliente não encontrado
function erroNaoEncontrado(res) {
  return res.status(404).json({ 
    erro: 'Cliente não encontrado' 
  });
}

// Lista todos os clientes
function listarClientes(req, res) {
  const clientes = clientesData.obterTodos();
  res.json(clientes);
}

// Busca um cliente específico por ID
function buscarCliente(req, res) {
  const id = parseInt(req.params.id);
  const cliente = clientesData.obterPorId(id);
  
  if (!cliente) {
    return erroNaoEncontrado(res);
  }
  
  res.json(cliente);
}

// Cria um novo cliente
function criarCliente(req, res) {
  const { nome, email, telefone, cidade } = req.body;
  
  if (!validarCampos(nome, email, telefone, cidade)) {
    return erroValidacao(res);
  }
  
  const novoCliente = clientesData.criar({
    nome, email, telefone, cidade
  });
  
  res.status(201).json(novoCliente);
}

// Atualiza um cliente existente
function atualizarCliente(req, res) {
  const id = parseInt(req.params.id);
  const { nome, email, telefone, cidade } = req.body;
  
  if (!validarCampos(nome, email, telefone, cidade)) {
    return erroValidacao(res);
  }
  
  const clienteAtualizado = clientesData.atualizar(id, {
    nome, email, telefone, cidade
  });
  
  if (!clienteAtualizado) {
    return erroNaoEncontrado(res);
  }
  
  res.json(clienteAtualizado);
}

// Remove um cliente
function removerCliente(req, res) {
  const id = parseInt(req.params.id);
  const removido = clientesData.remover(id);
  
  if (!removido) {
    return erroNaoEncontrado(res);
  }
  
  res.status(204).send();
}

module.exports = {
  listarClientes,
  buscarCliente,
  criarCliente,
  atualizarCliente,
  removerCliente
};
