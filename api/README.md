# API REST de Clientes - FarmUp Challenge

API REST simples para gerenciar cadastro de clientes, desenvolvida com Node.js e Express.

## 📋 Descrição

Este projeto é uma API REST que permite realizar operações CRUD (Create, Read, Update, Delete) em um cadastro de clientes. Foi desenvolvida seguindo boas práticas de código limpo e arquitetura em 3 camadas, ideal para aprendizado de iniciantes em desenvolvimento backend.

### Características

- **Arquitetura em 3 camadas**: Separação clara entre rotas, controladores e dados
- **Código limpo**: Funções pequenas, nomes descritivos, comentários em português
- **Simplicidade**: Sem padrões complexos, fácil de entender e modificar
- **Armazenamento em memória**: Dados mantidos em memória (reinicia ao parar o servidor)

### Campos do Cliente

Cada cliente possui os seguintes campos:
- `id`: Identificador único (gerado automaticamente)
- `nome`: Nome completo do cliente
- `email`: Endereço de e-mail
- `telefone`: Número de telefone
- `cidade`: Cidade onde o cliente reside

## 🚀 Instalação

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)

### Passos para instalação

1. Clone o repositório:
```bash
git clone https://github.com/marcio-loiola/farmup-challenge.git
cd farmup-challenge
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm start
```

O servidor estará rodando em `http://localhost:3000`

## 📚 Endpoints da API

### 1. Listar todos os clientes

**GET** `/clientes`

Retorna a lista de todos os clientes cadastrados.

**Exemplo de requisição:**
```bash
curl http://localhost:3000/clientes
```

**Resposta (200 OK):**
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@exemplo.com",
    "telefone": "(11) 98765-4321",
    "cidade": "São Paulo"
  },
  {
    "id": 2,
    "nome": "Maria Santos",
    "email": "maria@exemplo.com",
    "telefone": "(21) 91234-5678",
    "cidade": "Rio de Janeiro"
  }
]
```

### 2. Buscar cliente por ID

**GET** `/clientes/:id`

Retorna os dados de um cliente específico.

**Exemplo de requisição:**
```bash
curl http://localhost:3000/clientes/1
```

**Resposta (200 OK):**
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "telefone": "(11) 98765-4321",
  "cidade": "São Paulo"
}
```

**Resposta de erro (404 Not Found):**
```json
{
  "erro": "Cliente não encontrado"
}
```

### 3. Criar novo cliente

**POST** `/clientes`

Cria um novo cliente no sistema.

**Exemplo de requisição:**
```bash
curl -X POST http://localhost:3000/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Pedro Oliveira",
    "email": "pedro@exemplo.com",
    "telefone": "(31) 99876-5432",
    "cidade": "Belo Horizonte"
  }'
```

**Resposta (201 Created):**
```json
{
  "id": 3,
  "nome": "Pedro Oliveira",
  "email": "pedro@exemplo.com",
  "telefone": "(31) 99876-5432",
  "cidade": "Belo Horizonte"
}
```

**Resposta de erro (400 Bad Request):**
```json
{
  "erro": "Todos os campos são obrigatórios"
}
```

### 4. Atualizar cliente

**PUT** `/clientes/:id`

Atualiza os dados de um cliente existente.

**Exemplo de requisição:**
```bash
curl -X PUT http://localhost:3000/clientes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva Santos",
    "email": "joao.silva@exemplo.com",
    "telefone": "(11) 98765-4321",
    "cidade": "São Paulo"
  }'
```

**Resposta (200 OK):**
```json
{
  "id": 1,
  "nome": "João Silva Santos",
  "email": "joao.silva@exemplo.com",
  "telefone": "(11) 98765-4321",
  "cidade": "São Paulo"
}
```

**Resposta de erro (404 Not Found):**
```json
{
  "erro": "Cliente não encontrado"
}
```

### 5. Remover cliente

**DELETE** `/clientes/:id`

Remove um cliente do sistema.

**Exemplo de requisição:**
```bash
curl -X DELETE http://localhost:3000/clientes/1
```

**Resposta (204 No Content):**
```
(sem conteúdo)
```

**Resposta de erro (404 Not Found):**
```json
{
  "erro": "Cliente não encontrado"
}
```

## 🏗️ Estrutura do Projeto

```
farmup-challenge/
├── server.js              # Arquivo principal que inicia o servidor
├── routes/
│   └── clientes.js        # Define os endpoints da API
├── controllers/
│   └── clientesController.js  # Lógica de negócio
├── data/
│   └── clientes.js        # Armazenamento em memória
├── package.json           # Dependências e scripts
└── README.md             # Documentação (este arquivo)
```

### Arquitetura em 3 Camadas

1. **Camada de Rotas** (`routes/`): Define os endpoints HTTP e mapeia para os controladores
2. **Camada de Controladores** (`controllers/`): Contém a lógica de negócio e validações
3. **Camada de Dados** (`data/`): Gerencia o armazenamento e acesso aos dados

## 🧪 Testando a API

### Sequência de testes completa

```bash
# 1. Verificar se o servidor está rodando
curl http://localhost:3000/

# 2. Listar todos os clientes (deve ter 2 clientes iniciais)
curl http://localhost:3000/clientes

# 3. Buscar um cliente específico
curl http://localhost:3000/clientes/1

# 4. Criar um novo cliente
curl -X POST http://localhost:3000/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ana Costa",
    "email": "ana@exemplo.com",
    "telefone": "(41) 98888-7777",
    "cidade": "Curitiba"
  }'

# 5. Listar novamente para ver o novo cliente
curl http://localhost:3000/clientes

# 6. Atualizar o cliente criado (use o ID retornado)
curl -X PUT http://localhost:3000/clientes/3 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ana Costa Silva",
    "email": "ana.costa@exemplo.com",
    "telefone": "(41) 98888-7777",
    "cidade": "Curitiba"
  }'

# 7. Remover o cliente
curl -X DELETE http://localhost:3000/clientes/3

# 8. Tentar buscar o cliente removido (deve retornar erro 404)
curl http://localhost:3000/clientes/3
```

### Testando com ferramentas gráficas

Você também pode testar usando:
- **Postman**: Importe os endpoints e teste visualmente
- **Insomnia**: Alternativa ao Postman
- **Thunder Client**: Extensão do VS Code

## 📖 Aprendizados

Este projeto demonstra conceitos fundamentais:

- **REST API**: Padrão de arquitetura para APIs web
- **CRUD**: Operações básicas de banco de dados
- **Express.js**: Framework web minimalista para Node.js
- **Arquitetura em camadas**: Separação de responsabilidades
- **HTTP Status Codes**: 200, 201, 204, 400, 404
- **JSON**: Formato de troca de dados
- **Middleware**: Processamento de requisições (express.json)

## 🤝 Contribuindo

Este é um projeto educacional. Sugestões e melhorias são bem-vindas!

## 📝 Licença

ISC

## 👨‍💻 Autor

Desenvolvido como parte do desafio de estágio FarmUp 
