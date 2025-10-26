# 🚀 FarmUp Challenge - Fullstack Client Management

[![Node.js](https://img.shields.io/badge/Node.js-16%2B-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/MUI-7.3-purple)](https://mui.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://docker.com/)

Sistema completo de gerenciamento de clientes desenvolvido com Node.js, Express, React e Material-UI.

---

## 🏗️ Arquitetura do Projeto

```
farmup-challenge/
├── apps/
│   ├── api/                    # 🔧 Backend - API REST
│   │   ├── server.js          # Servidor Express  
│   │   ├── controllers/       # Lógica de negócio
│   │   ├── data/             # Dados em memória
│   │   ├── routes/           # Endpoints REST
│   │   └── package.json      # Dependências API
│   └── client/               # ⚛️ Frontend - React App
│       ├── src/              # Código fonte React
│       │   ├── components/   # Componentes UI
│       │   └── services/     # Integração API
│       ├── public/           # Assets estáticos
│       └── package.json      # Dependências Client
├── docker-compose.yml        # 🐳 Orquestração containers
├── Dockerfile.*              # 🐳 Multi-stage builds
└── package.json              # 📦 Workspace monorepo
```

---

## ⚡ Quick Start

### 📋 Pré-requisitos
- **Node.js** 16+ 
- **npm** 8+
- **Docker** (opcional)

### 🚀 Instalação e Execução

#### **Opção 1: Desenvolvimento Local**
```bash
# Clonar e instalar dependências
git clone <repo-url>
cd farmup-challenge
npm run install:all

# Executar ambos os serviços
npm run dev

# Ou executar separadamente:
npm run dev:api      # API: http://localhost:8080
npm run dev:client   # Client: http://localhost:5173
```

#### **Opção 2: Docker (Produção)**
```bash
# Build e execução
npm run docker:build
npm run docker:up

# Acessar:
# API: http://localhost:8080
# Client: http://localhost:3000
```

#### **Opção 3: Docker (Desenvolvimento)**
```bash
docker-compose up dev
# API: http://localhost:8080
# Client: http://localhost:5173
```

---

## 🎯 Funcionalidades

### ✅ **Implementadas**
- 📋 **Listar Clientes** - Visualização completa
- ➕ **Criar Cliente** - Formulário modal Material-UI
- 🗑️ **Deletar Cliente** - Remoção com confirmação
- 🎨 **Interface Moderna** - Material-UI profissional
- 🔄 **API REST Completa** - CRUD endpoints
- 🌐 **CORS Configurado** - Integração frontend/backend
- 📱 **Responsivo** - Design adaptável

### 🔄 **Em Desenvolvimento**
- ✏️ **Editar Cliente** - Formulário de atualização
- ✅ **Validações** - Formulários e campos obrigatórios
- 🔔 **Feedback Visual** - Loading states e notificações
- 🔍 **Busca e Filtros** - Pesquisa avançada

---

## 📚 API Endpoints

| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| GET | `/` | Info da API | ✅ |
| GET | `/clientes` | Listar todos | ✅ |
| GET | `/clientes/:id` | Buscar por ID | ✅ |
| POST | `/clientes` | Criar novo | ✅ |
| PUT | `/clientes/:id` | Atualizar | ✅ |
| DELETE | `/clientes/:id` | Remover | ✅ |

### 📄 **Exemplo de Cliente**
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "telefone": "(11) 98765-4321",
  "cidade": "São Paulo"
}
```

---

## 🛠️ Stack Tecnológica

### **Backend**
- **Node.js** 18+ - Runtime JavaScript
- **Express.js** 5.1 - Framework web
- **CORS** 2.8 - Cross-origin requests

### **Frontend**  
- **React** 19.1 - UI Library
- **Vite** 7.1 - Build tool
- **Material-UI** 7.3 - Component library
- **Axios** 1.12 - HTTP client

### **DevOps**
- **Docker** - Containerização
- **Docker Compose** - Orquestração
- **Nginx** - Proxy reverso (produção)

---

## 🧪 Testes e Validação

### **Teste Rápido da API**
```bash
# Status da API
curl http://localhost:8080/

# Listar clientes
curl http://localhost:8080/clientes

# Criar cliente
curl -X POST http://localhost:8080/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"Ana Costa","email":"ana@teste.com","telefone":"(11)99999-8888","cidade":"São Paulo"}'
```

### **Teste da Integração**
1. Acesse: http://localhost:5173 (dev) ou http://localhost:3000 (prod)
2. Verifique se a lista de clientes carrega
3. Teste criar novo cliente
4. Teste deletar cliente

---

## 📦 Scripts Disponíveis

### **Raiz do Projeto**
```bash
npm run install:all     # Instalar todas as dependências
npm run dev            # Executar API + Client
npm run build          # Build do cliente
npm run docker:build   # Build containers Docker
npm run docker:up      # Executar com Docker
```

### **API** (`apps/api`)
```bash
npm start              # Produção
npm run dev            # Desenvolvimento (nodemon)
```

### **Client** (`apps/client`)  
```bash  
npm run dev            # Desenvolvimento (Vite)
npm run build          # Build produção
npm run preview        # Preview build
npm run lint           # ESLint check
```

---

## 🐳 Docker

### **Serviços Disponíveis**
- **`api`** - API REST (porta 8080)
- **`client`** - Frontend React (porta 3000)  
- **`dev`** - Ambiente desenvolvimento (8080 + 5173)

### **Comandos Docker**
```bash
# Produção
docker-compose up api client

# Desenvolvimento  
docker-compose up dev

# Build específico
docker-compose build api
docker-compose build client
```

---

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Adicionar nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

## 📊 Status do Projeto

| Componente | Status | Progresso |
|-----------|--------|-----------|
| **API REST** | ✅ Completa | 100% |
| **Frontend Core** | ✅ Funcional | 85% |
| **Integração** | ✅ Funcionando | 100% |
| **Docker** | ✅ Configurado | 100% |
| **Documentação** | ✅ Completa | 100% |

---

## 📝 Licença

ISC © FarmUp Team

---

## 🎯 Roadmap

- [ ] Implementar edição de clientes
- [ ] Adicionar validações de formulário
- [ ] Implementar sistema de busca
- [ ] Adicionar testes automatizados
- [ ] Integrar banco de dados persistente
- [ ] Implementar autenticação
- [ ] Deploy em produção

---

**Status Atual**: ✅ **Sistema funcional e pronto para uso**

