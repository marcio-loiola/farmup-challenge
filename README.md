# 🚀 FarmUp Challenge - Sistema de Gerenciamento de Clientes

Sistema fullstack para gerenciar cadastro de clientes desenvolvido com Node.js, Express, React e Material-UI.

---

## 🏗️ Arquitetura

```
farmup-challenge/
├── app/
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
# 1. Instalar dependências na raiz
npm install

# 2. Executar API (Terminal 1)
cd app/api && npm start
# API: http://localhost:8080

# 3. Executar Cliente (Terminal 2)
cd app/client && npm run dev  
# Client: http://localhost:5173
```

### 🐳 Docker (Opcional)

```bash
# Build e executar
docker-compose up --build

# Desenvolvimento (com hot reload)
docker-compose -f docker-compose.dev.yml up --build
```

---

## 🎯 Funcionalidades

### ✅ Implementadas
- 📋 **Listar Clientes** - Interface com Material-UI responsiva
- ➕ **Criar Cliente** - Formulário modal com validação
- 🗑️ **Deletar Cliente** - Remoção com confirmação
- 🔍 **Filtros Avançados** - Por cidade e nome (bônus)
- 🌐 **API REST Completa** - CRUD + validações
- 🔄 **Integração Completa** - Frontend/Backend sincronizados

### 📋 Estrutura do Cliente
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

## 📚 API Endpoints

**Base URL:** `http://localhost:8080`  
**📚 Documentação Swagger:** `http://localhost:8080/docs`

### Endpoints Básicos
| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| GET | `/` | Informações da API | 200 |
| GET | `/clientes` | Listar todos | 200 |
| GET | `/clientes/:id` | Buscar por ID | 200/404 |
| POST | `/clientes` | Criar novo | 201/400/409 |
| PUT | `/clientes/:id` | Atualizar | 200/400/404 |
| DELETE | `/clientes/:id` | Remover | 204/404 |

### Query Parameters (Bônus)
| Parâmetro | Exemplo | Descrição |
|-----------|---------|-----------|
| `cidade` | `?cidade=São Paulo` | Filtrar por cidade |
| `nome` | `?nome=João` | Busca parcial no nome |
| Combinado | `?cidade=SP&nome=Silva` | Filtros simultâneos |

---

## 🛠️ Stack Tecnológica

**Backend:** Node.js 18 + Express.js 5 + CORS + Swagger  
**Frontend:** React 19 + Vite 7 + Material-UI 6 + Axios  
**DevOps:** Docker + Docker Compose  
**Docs:** Swagger/OpenAPI 3.0

---

## 💎 Recursos Bônus Implementados

### ✅ **1. Validação de Email Único (409 Conflict)**
```bash
# Tenta criar cliente com email duplicado
curl -X POST http://localhost:8080/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome": "Teste", "email": "joao@exemplo.com", ...}'
# Retorna: {"message": "E-mail já cadastrado."} - Status 409
```

### ✅ **2. Filtro por Cidade**
```bash
# Case-insensitive
curl "http://localhost:8080/clientes?cidade=são paulo"
```

### ✅ **3. Busca por Nome Parcial**
```bash
# Encontra qualquer cliente com "Maria" no nome
curl "http://localhost:8080/clientes?nome=Maria"
```

### ✅ **4. Filtros Combinados**
```bash
# Clientes de SP com "Silva" no nome
curl "http://localhost:8080/clientes?cidade=São Paulo&nome=Silva"
```

---

## 🧪 Teste Rápido (30 segundos)

```bash
# 1. API Status
curl http://localhost:8080/

# 2. Listar clientes iniciais
curl http://localhost:8080/clientes

# 3. Abrir frontend
# http://localhost:5173

# 4. 📚 Documentação Swagger (NOVO!)
# http://localhost:8080/docs
```

**Para testes completos:** Consulte `TESTE_MANUAL.md`  
**Dúvidas?** Entre em contato via WhatsApp: [(88) 99630-0791](https://wa.me/5588996300791?text=me%20chame%20no%20whatsapp!)  
**Demonstração:** Veja os vídeos oficiais acima 📹

---

## 🚨 Solução de Problemas Comuns

### API não inicia
```bash
cd app/api && npm install && npm start
```

### Frontend não carrega clientes
```bash
# Verificar se API está rodando
curl http://localhost:8080/clientes
```

### Erro CORS
- Verificar se API está na porta 8080
- URL no frontend: `app/client/src/services/api.js`

### Porta ocupada
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <numero> /F
```

---

## 🎯 Arquitetura dos Componentes

```
App.jsx (Estado Global)
  ↓
MainLayout (Container Principal)
  ├─→ Header (Navegação)
  ├─→ ClientList (Lista + Grid responsivo)
  ├─→ ClientForm (Modal + Validação)
  └─→ Snackbar (Notificações)
```

### Responsividade
- **Desktop**: Layout em grid 2 colunas
- **Mobile**: Empilhamento vertical
- **Tablet**: Adaptação automática

---

## 🔮 Próximas Evoluções

<details>
<summary>💡 Roadmap de melhorias</summary>

### Funcionalidades
- [ ] Edição inline de clientes
- [ ] Paginação para grandes volumes
- [ ] Busca em tempo real
- [ ] Exportar/Importar dados
- [ ] Dashboard com estatísticas

### Técnico
- [ ] Banco de dados (PostgreSQL)
- [ ] Autenticação JWT
- [ ] Testes automatizados
- [ ] CI/CD Pipeline
- [ ] Monitoramento de logs

### UX/UI
- [ ] Tema escuro/claro
- [ ] Animações de transição
- [ ] Loading skeletons
- [ ] Offline support
- [ ] PWA features

</details>

---

## 📄 Licença

ISC © FarmUp Challenge

---

**Status:** ✅ Sistema completo - Pronto para produção

**Desenvolvido com ❤️ para o FarmUp Challenge**

