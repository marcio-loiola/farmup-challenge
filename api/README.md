# FarmUp Challenge - API REST

API REST Node.js para gerenciar cadastro de clientes.

## 🏗️ Estrutura do Projeto

```
farmup-challenge/
├── api/                    # Backend - API REST Node.js
│   ├── server.js          # Servidor principal (porta 8080)
│   ├── routes/            # Rotas da API
│   ├── controllers/       # Lógica de negócio
│   ├── data/             # Armazenamento em memória
│   └── package.json      # Dependências do backend
├── TESTE_MANUAL.md       # Guia de teste manual
└── README.md             # Este arquivo
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm
- Git

### Executar a API

```bash
# Na raiz do projeto
cd api

# Instalar dependências
npm install

# Iniciar servidor da API
npm start
```

✅ **Sucesso**: API rodando em `http://localhost:8080`

## 🧪 Teste Rápido

```bash
# Testar se API está respondendo
curl http://localhost:8080/

# Listar clientes
curl http://localhost:8080/clientes
```

## 📋 Funcionalidades

### API REST (/api)
- ✅ Servidor Express.js na porta 8080
- ✅ CORS configurado
- ✅ Endpoints CRUD para clientes
- ✅ Arquitetura em 3 camadas
- ✅ Validações e tratamento de erros

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

## 🧪 Testes

Consulte o arquivo `TESTE_MANUAL.md` para instruções completas de teste.

## 🔮 Próximos Passos

- [ ] Frontend React (será desenvolvido em breve)
- [ ] Banco de dados persistente
- [ ] Autenticação/Autorização
- [ ] Deploy em produção

## 📝 Licença

ISC

---

**Status**: ✅ API funcionando - Pronta para integração com frontend

