# 🚀 FarmUp Challenge - Sistema de Gerenciamento de Clientes

Sistema fullstack para gerenciar cadastro de clientes desenvolvido com Node.js, Express, React e Material-UI.

---

## 🏗️ Arquitetura

```
farmup-challenge/
├── apps/
│   ├── api/                    # Backend - API REST Node.js
│   │   ├── server.js          # Servidor Express (porta 8080)
│   │   ├── controllers/       # Lógica de negócio
│   │   ├── data/             # Dados em memória
│   │   └── routes/           # Endpoints REST
│   └── client/               # Frontend - React App
│       ├── src/              # Código fonte React
│       │   ├── components/   # Componentes UI
│       │   └── services/     # Integração API
│       └── public/           # Assets estáticos
├── package.json              # Workspace monorepo
└── Dockerfile               # Container multi-stage
```

---

## ⚡ Quick Start

### 🔧 Desenvolvimento Local

```bash
# 1. Instalar dependências
npm install

# 2. Executar API
cd apps/api && npm start
# API: http://localhost:8080

# 3. Executar Cliente (novo terminal)
cd apps/client && npm run dev  
# Client: http://localhost:5173
```

### 🐳 Docker (Opcional)

```bash
# Desenvolvimento
docker-compose up dev

# Produção
docker-compose up api client
```

---

## 🎯 Funcionalidades

### ✅ Implementadas
- 📋 **Listar Clientes** - Interface com Material-UI
- ➕ **Criar Cliente** - Formulário modal
- 🗑️ **Deletar Cliente** - Remoção direta
- 🌐 **API REST Completa** - CRUD endpoints
- 🔄 **Integração Frontend/Backend** - Funcionando

### 📋 Campos do Cliente
- **ID** - Gerado automaticamente
- **Nome** - Nome completo
- **Email** - Endereço de e-mail  
- **Telefone** - Número de contato
- **Cidade** - Localização

---

## 📚 API Endpoints

**Base URL:** `http://localhost:8080`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Informações da API |
| GET | `/clientes` | Listar todos |
| GET | `/clientes/:id` | Buscar por ID |
| POST | `/clientes` | Criar novo |
| PUT | `/clientes/:id` | Atualizar |
| DELETE | `/clientes/:id` | Remover |

### Exemplo JSON
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

**Backend:** Node.js 18 + Express.js 5 + CORS  
**Frontend:** React 19 + Vite 7 + Material-UI 7 + Axios  
**DevOps:** Docker + Docker Compose

---

## 🧪 Testes

Consulte `TESTE_MANUAL.md` para instruções detalhadas de teste.

**Teste Rápido:**
```bash
# API
curl http://localhost:8080/clientes

# Frontend  
# Abrir: http://localhost:5173
```

---

## 🔮 Sugestões para Evolução Futura

<details>
<summary>💡 Clique para ver melhorias avançadas</summary>

### Performance & Produção
- **Nginx** como proxy reverso + cache
- **Redis** para cache de dados
- **PM2** para gerenciamento de processos
- **Load balancer** para múltiplas instâncias

### Funcionalidades
- **Edição de clientes** inline
- **Busca e filtros** avançados
- **Paginação** para grandes volumes
- **Validações** de formulário completas
- **Loading states** e feedback visual

### Segurança & Dados
- **Autenticação** JWT + middleware
- **Banco de dados** PostgreSQL/MongoDB
- **Migrations** para estrutura DB
- **Backup** automático

### DevOps & Qualidade
- **CI/CD** GitHub Actions
- **Testes automatizados** Jest + Testing Library
- **ESLint + Prettier** configurados
- **Monitoramento** logs + métricas
- **Deploy automatizado** AWS/GCP/Azure

### Arquitetura
- **Microserviços** separação por domínio
- **Message Queue** para processamento assíncrono
- **API Gateway** centralização de requests
- **Containerização** Kubernetes

</details>

---

## 📝 Licença

ISC © FarmUp Challenge

---

**Status:** ✅ Sistema funcional - Pronto para avaliação

