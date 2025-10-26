// Armazenamento em memória para clientes
// Este arquivo gerencia os dados dos clientes de forma simples

let clientes = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@exemplo.com",
    telefone: "(11) 98765-4321",
    cidade: "São Paulo"
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@exemplo.com",
    telefone: "(21) 91234-5678",
    cidade: "Rio de Janeiro"
  }
];

// Contador para gerar novos IDs
let proximoId = 3;

// Retorna todos os clientes
function obterTodos() {
  return clientes;
}

// Retorna um cliente pelo ID
function obterPorId(id) {
  return clientes.find(c => c.id === id);
}

// Cria um novo cliente
function criar(cliente) {
  const novoCliente = {
    id: proximoId++,
    ...cliente
  };
  clientes.push(novoCliente);
  return novoCliente;
}

// Atualiza um cliente existente
function atualizar(id, dados) {
  const indice = clientes.findIndex(c => c.id === id);
  if (indice === -1) {
    return null;
  }
  
  clientes[indice] = {
    id: id,
    ...dados
  };
  return clientes[indice];
}

// Remove um cliente
function remover(id) {
  const indice = clientes.findIndex(c => c.id === id);
  if (indice === -1) {
    return false;
  }
  
  clientes.splice(indice, 1);
  return true;
}

module.exports = {
  obterTodos,
  obterPorId,
  criar,
  atualizar,
  remover
};
