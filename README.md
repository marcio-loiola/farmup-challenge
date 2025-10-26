# FarmUp Challenge - Fullstack Project

Projeto fullstack com API REST Node.js + Cliente React para gerenciar cadastro de clientes.

## 🏗️ Estrutura do Projeto

```
farmup-challenge/
├── api/                    # Backend - API REST Node.js
│   ├── server.js          # Servidor principal (porta 8080)
│   ├── routes/            # Rotas da API
│   ├── controllers/       # Lógica de negócio
│   ├── data/             # Armazenamento em memória
│   └── package.json      # Dependências do backend
├── client/                # Frontend - React App
│   ├── src/              # Código fonte React
│   ├── public/           # Arquivos públicos
│   └── package.json      # Dependências do frontend
└── README.md             # Este arquivo
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Git

### 1. Executar a API (Backend)

```bash
# Na raiz do projeto
cd api

# Instalar dependências
npm install

# Iniciar servidor da API
npm start
```

✅ **Sucesso**: API rodando em `http://localhost:8080`

### 2. Executar o Cliente (Frontend)

```bash
# Em outro terminal, na raiz do projeto  
cd client

# Instalar dependências
yarn install

# Iniciar servidor de desenvolvimento
yarn start
```

✅ **Sucesso**: Cliente React rodando em `http://localhost:3000`

## 🧪 Smoke Test - Validação Rápida

Execute este teste para verificar se tudo está funcionando:

### API Test
```bash
cd api && npm install && node server.js
# Deve exibir: "Servidor rodando em http://localhost:8080"
```

### Cliente Test  
```bash
cd client && yarn install && yarn start
# Deve exibir: "Compiled successfully!"
```

## 📋 Funcionalidades

### API REST (/api)
- ✅ Servidor Express.js na porta 8080
- ✅ CORS configurado para permitir conexões do React
- ✅ Endpoints CRUD para clientes
- ✅ Arquitetura em 3 camadas

### Cliente React (/client)
- ✅ Servidor de desenvolvimento na porta 3000
- ✅ Create React App configurado
- ✅ Browserslist atualizado
- 🔄 Interface para consumir a API (em desenvolvimento)

## 🔧 Melhorias Implementadas

### ✅ Resolvido no Smoke Test
- **Conflito de Portas**: API movida para porta 8080, React mantido em 3000
- **CORS**: Configurado na API para permitir conexões do cliente
- **Browserslist**: Atualizado para resolver warnings
- **Dependências**: Todas instaladas corretamente

### 🔄 Próximos Passos
- Conectar cliente React à API
- Implementar interface de cadastro de clientes  
- Adicionar validações no frontend
- Melhorar UI/UX

## 📚 Endpoints da API

### Base URL: `http://localhost:8080`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Informações da API |
| GET | `/clientes` | Listar todos os clientes |
| GET | `/clientes/:id` | Buscar cliente por ID |
| POST | `/clientes` | Criar novo cliente |
| PUT | `/clientes/:id` | Atualizar cliente |
| DELETE | `/clientes/:id` | Remover cliente |

### Exemplo de Cliente
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@exemplo.com", 
  "telefone": "(11) 98765-4321",
  "cidade": "São Paulo"
}
```

## 🛠️ Tecnologias

### Backend
- Node.js
- Express.js  
- CORS

### Frontend  
- React 18
- Create React App
- Yarn

## 🤝 Contribuindo

Este é um projeto educacional do programa de estágio da FarmUp.

## 📝 Licença

ISC

---

**Status**: ✅ Base do projeto funcionando - Pronto para desenvolvimento

