# 🔄 Fluxo de Integração - Visualização Completa

## 📡 Arquitetura da Integração

```
┌─────────────────────────────────────────────────────────────┐
│                   NAVEGADOR (Cliente)                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         React App (Porta 5173 - Vite)               │    │
│  │  ┌────────────────────────────────────────────────┐ │    │
│  │  │  App.jsx                                       │ │    │
│  │  │  - State: clients, snackbar                   │ │    │
│  │  │  - useEffect: getClients()                    │ │    │
│  │  └────────────────────────────────────────────────┘ │    │
│  │  ┌────────────────────────────────────────────────┐ │    │
│  │  │  api.js (axios)                               │ │    │
│  │  │  baseURL: 'http://localhost:8080'             │ │    │
│  │  │  - GET /clientes                              │ │    │
│  │  │  - POST /clientes                             │ │    │
│  │  │  - DELETE /clientes/:id                       │ │    │
│  │  └────────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────────┘    │
│                           ↑                                   │
│                           │ HTTP JSON                         │
│                           ↓                                   │
└─────────────────────────────────────────────────────────────┘
         ║                                              ║
         ║           TCP Porta 8080                     ║
         ║                                              ║
┌─────────────────────────────────────────────────────────────┐
│                        SERVIDOR (API)                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │      Express.js (Porta 8080)                        │    │
│  │  ┌────────────────────────────────────────────────┐ │    │
│  │  │  server.js                                    │ │    │
│  │  │  - cors middleware (permite 5173)             │ │    │
│  │  │  - express.json middleware                    │ │    │
│  │  │  - Route: /clientes                           │ │    │
│  │  └────────────────────────────────────────────────┘ │    │
│  │  ┌────────────────────────────────────────────────┐ │    │
│  │  │  routes/clientes.js                           │ │    │
│  │  │  - GET /  → listarClientes                    │ │    │
│  │  │  - POST / → criarCliente                      │ │    │
│  │  │  - DELETE /:id → removerCliente               │ │    │
│  │  └────────────────────────────────────────────────┘ │    │
│  │  ┌────────────────────────────────────────────────┐ │    │
│  │  │  controllers/clientesController.js            │ │    │
│  │  │  - validarCampos()                            │ │    │
│  │  │  - listarClientes() → clientesData.obterTodos()  │ │  │
│  │  │  - criarCliente()                             │ │    │
│  │  │  - removerCliente()                           │ │    │
│  │  └────────────────────────────────────────────────┘ │    │
│  │  ┌────────────────────────────────────────────────┐ │    │
│  │  │  data/clientes.js (Memória)                  │ │    │
│  │  │  let clientes = [João, Maria]                │ │    │
│  │  │  - obterTodos()                              │ │    │
│  │  │  - criar(cliente)                            │ │    │
│  │  │  - remover(id)                               │ │    │
│  │  └────────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔀 Fluxo 1: Carregar Clientes Inicialmente

### Timeline:

```
TEMPO    CLIENTE                                  SERVIDOR
  │
  0s   App monta
       useEffect dispara
       getClients() chamada
  │
  │    ├─ api.get('/clientes')
  │    │  Requisição HTTP
  │    └─→ http://localhost:8080/clientes
  │                                           ← Recebe GET /clientes
  │                                           ← CORS: permite? SIM ✓
  │                                           ← Router roteia
  │                                           ← Controller: listarClientes()
  │                                           ← clientesData.obterTodos()
  │                                           ├─ [
  │                                           │  {id:1, nome:"João"...},
  │                                           │  {id:2, nome:"Maria"...}
  │                                           │ ]
  │    ← res.json(resultado)
       Response 200 OK recebida
       response.data = [João, Maria]
  │
  1s   setClients(response.data)
       State atualizado
       React re-renderiza
  │
  2s   ClientList renderiza 2 clientes
       Tela mostra lista
```

### Código correspondente:

**Frontend (App.jsx):**

```javascript
useEffect(() => {
  getClients(); // ← Dispara ao montar
}, []);

const getClients = async () => {
  try {
    const response = await api.get("/clientes"); // ← Requisição
    setClients(response.data); // ← Atualiza state
  } catch (error) {
    showSnackbar("Erro ao carregar clientes", "error"); // ← Se falhar
  }
};
```

**Backend (server.js):**

```javascript
app.get("/clientes", clientesController.listarClientes);
```

**Backend (controller):**

```javascript
function listarClientes(req, res) {
  const resultado = clientesData.obterTodos(); // ← Busca dados
  res.json(resultado); // ← Retorna
}
```

---

## ➕ Fluxo 2: Criar Novo Cliente

### Timeline:

```
TEMPO    CLIENTE                           SERVIDOR
  │
  0s   Usuário clica [Adicionar Cliente]
       Modal abre
  │
  2s   Usuário preenche form:
       - Nome: Pedro
       - Email: pedro@test.com
       - Telefone: (11) 99999-9999
       - Cidade: SP
  │
  5s   Usuário clica "Salvar"
       handleSubmit() executada
       isFormValid()? SIM ✓
  │
       api.post('/clientes', client)
       Requisição HTTP
       POST http://localhost:8080/clientes
       Body: {
         nome: "Pedro",
         email: "pedro@test.com",
         telefone: "(11) 99999-9999",
         cidade: "SP"
       }
  │                                    ← Recebe POST /clientes
  │                                    ← CORS: permite? SIM ✓
  │                                    ← Router roteia
  │                                    ← Controller: criarCliente()
  │                                    ← validarCampos()? SIM ✓
  │                                    ├─ Verificar email duplicado?
  │                                    │  emailExistente = busca
  │                                    │  Encontrou? NÃO ✓
  │                                    ├─ clientesData.criar(cliente)
  │                                    │  novoCliente = {
  │                                    │    id: 3,
  │                                    │    nome: "Pedro",
  │                                    │    email: "pedro@test.com",
  │                                    │    telefone: "(11) 99999-9999",
  │                                    │    cidade: "SP"
  │                                    │  }
  │                                    │  clientes.push(novoCliente)
  │    ← res.status(201).json(novoCliente)
  6s   Response 201 CREATED recebida
       response.data = {id:3, ...}
  │
       setClients([...clients, response.data])
       State atualizado com novo cliente
  │
  7s   handleClose()
       Modal fecha
       Form limpa
  │
       showSnackbar("Cliente cadastrado!", "success")
       Notificação verde aparece
  │
  8s   ClientList re-renderiza
       Mostra 3 clientes agora (João, Maria, Pedro)
```

### Código correspondente:

**Frontend (App.jsx):**

```javascript
const addClient = async (client) => {
  try {
    const response = await api.post("/clientes", client); // ← POST
    setClients([...clients, response.data]); // ← Adiciona na lista
    showSnackbar("Cliente cadastrado com sucesso!", "success");
    return response;
  } catch (error) {
    throw error; // ← Para o formulário tratar
  }
};
```

**Frontend (ClientForm.jsx):**

```javascript
const handleSubmit = async () => {
  if (!isFormValid()) {
    setError("Todos os campos são obrigatórios");
    return;
  }

  setLoading(true);

  try {
    await addClient(client); // ← Chama função do App
    handleClose(); // ← Fecha modal
  } catch (err) {
    if (err.response?.status === 409) {
      setError("Este e-mail já está cadastrado");
    } else {
      setError("Erro ao cadastrar cliente");
    }
  } finally {
    setLoading(false);
  }
};
```

**Backend (controller):**

```javascript
function criarCliente(req, res) {
  const { nome, email, telefone, cidade } = req.body;

  if (!validarCampos(nome, email, telefone, cidade)) {
    return erroValidacao(res);
  }

  const emailExistente = clientesData
    .obterTodos()
    .find((c) => c.email === email);

  if (emailExistente) {
    return res.status(409).json({ message: "E-mail já cadastrado." });
  }

  const novoCliente = clientesData.criar({
    nome,
    email,
    telefone,
    cidade,
  });

  res.status(201).json(novoCliente);
}
```

---

## ❌ Fluxo 3: Deletar Cliente

### Timeline:

```
TEMPO    CLIENTE                           SERVIDOR
  │
  0s   Usuário clica ❌ (delete button)
  │
  1s   Dialog confirmação abre
       "Tem certeza que deseja remover?"
  │
  3s   Usuário clica "Remover"
       handleDeleteConfirm() executada
  │
       deleteClient(id) chamado
       api.delete(`/clientes/${id}`)
       Requisição HTTP
       DELETE http://localhost:8080/clientes/2
  │                                    ← Recebe DELETE /clientes/2
  │                                    ← CORS: permite? SIM ✓
  │                                    ← Router roteia
  │                                    ← Controller: removerCliente()
  │                                    ├─ validarId(2)? SIM ✓
  │                                    ├─ clientesData.remover(2)
  │                                    │  indice = clientes.findIndex(...)
  │                                    │  clientes.splice(indice, 1)
  │                                    │  return true
  │    ← res.status(204).send()
  4s   Response 204 NO CONTENT
  │
       setClients(clients.filter(c => c.id !== id))
       State atualizado
  │
  5s   ClientList re-renderiza
       Mostra 1 cliente agora (João)
       Maria foi removida ✓
  │
       showSnackbar("Cliente removido!", "success")
       Notificação verde aparece
```

### Código correspondente:

**Frontend (App.jsx):**

```javascript
const deleteClient = async (id) => {
  try {
    await api.delete(`/clientes/${id}`); // ← DELETE
    setClients(clients.filter((client) => client.id !== id)); // ← Remove
    showSnackbar("Cliente removido com sucesso!", "success");
  } catch (error) {
    showSnackbar("Erro ao remover cliente", "error");
  }
};
```

**Frontend (ClientList.jsx):**

```javascript
const handleDeleteConfirm = () => {
  if (deleteDialog.client) {
    deleteClient(deleteDialog.client.id); // ← Chama função do App
  }
  setDeleteDialog({ open: false, client: null }); // ← Fecha dialog
};
```

**Backend (controller):**

```javascript
function removerCliente(req, res) {
  const id = validarId(req.params.id);
  if (id === null) {
    return erroIdInvalido(res);
  }

  const removido = clientesData.remover(id);
  if (!removido) {
    return erroNaoEncontrado(res);
  }

  res.status(204).send(); // ← Sucesso, sem conteúdo
}
```

---

## 🚨 Fluxo de Erro: Email Duplicado

### Timeline:

```
TEMPO    CLIENTE                           SERVIDOR
  │
  0s   Usuário tenta criar cliente
       com email: joao@exemplo.com (já existe)
  │
  5s   Usuário clica "Salvar"
       handleSubmit() executada
       isFormValid()? SIM ✓
  │
       api.post('/clientes', client)
       POST http://localhost:8080/clientes
  │                                    ← Recebe POST
  │                                    ← validarCampos()? SIM ✓
  │                                    ├─ emailExistente = busca
  │                                    │  Encontrou? SIM ✗
  │    ← res.status(409).json({
  │       message: 'E-mail já cadastrado.'
  │     })
  6s   Response 409 CONFLICT recebida
       catch (err) executado
       err.response?.status === 409? SIM
  │
       setError('Este e-mail já está cadastrado')
       Dialog mostra erro em vermelho
  │
  7s   Usuário vê mensagem
       Modal permanece aberto
       Pode corrigir email e tentar novamente
```

### Código correspondente:

**Frontend (ClientForm.jsx):**

```javascript
try {
  await addClient(client);
  handleClose();
} catch (err) {
  if (err.response?.status === 409) {
    setError("Este e-mail já está cadastrado"); // ← Erro específico
  } else {
    setError("Erro ao cadastrar cliente"); // ← Erro genérico
  }
}
```

**Backend (controller):**

```javascript
const emailExistente = clientesData.obterTodos().find((c) => c.email === email);

if (emailExistente) {
  return res.status(409).json({ message: "E-mail já cadastrado." });
}
```

---

## 🌐 Requisições HTTP Detalhadas

### GET /clientes (Listar)

**Requisição:**

```http
GET http://localhost:8080/clientes HTTP/1.1
Host: localhost:8080
Origin: http://localhost:5173
Accept: application/json
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

---

### POST /clientes (Criar)

**Requisição:**

```http
POST http://localhost:8080/clientes HTTP/1.1
Host: localhost:8080
Origin: http://localhost:5173
Content-Type: application/json

{
  "nome": "Pedro Oliveira",
  "email": "pedro@exemplo.com",
  "telefone": "(31) 98765-4321",
  "cidade": "Belo Horizonte"
}
```

**Resposta (201 Created):**

```json
{
  "id": 3,
  "nome": "Pedro Oliveira",
  "email": "pedro@exemplo.com",
  "telefone": "(31) 98765-4321",
  "cidade": "Belo Horizonte"
}
```

---

### POST /clientes (Email Duplicado)

**Requisição:**

```http
POST http://localhost:8080/clientes HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
  "nome": "Outro João",
  "email": "joao@exemplo.com",
  "telefone": "(11) 1111-1111",
  "cidade": "SP"
}
```

**Resposta (409 Conflict):**

```json
{
  "message": "E-mail já cadastrado."
}
```

---

### DELETE /clientes/:id (Remover)

**Requisição:**

```http
DELETE http://localhost:8080/clientes/2 HTTP/1.1
Host: localhost:8080
Origin: http://localhost:5173
```

**Resposta (204 No Content):**

```
(Sem corpo de resposta)
```

---

## 🔐 CORS - O que acontece

### ✅ Cenário OK (CORS Correto)

```
Navegador (5173)
    ↓ Requisição
    ├─ Origin: http://localhost:5173

Servidor (8080)
    ├─ CORS middleware valida
    ├─ Origin é permitida? SIM ✓
    ├─ Adiciona header:
    │  Access-Control-Allow-Origin: http://localhost:5173
    ↓ Resposta

Navegador
    ├─ Recebe resposta com CORS header
    ├─ Permite usar dados ✓
    ├─ React exibe dados
```

### ❌ Cenário com Erro (CORS Bloqueado)

```
Navegador (5173)
    ↓ Requisição
    ├─ Origin: http://localhost:5173

Servidor (8080)
    ├─ CORS middleware valida
    ├─ Origin é permitida? NÃO ✗
    ├─ Não adiciona CORS headers
    ↓ Resposta (sem CORS)

Navegador
    ├─ Bloqueador de CORS ativado
    ├─ Não permite usar dados ✗
    ├─ Console erro:
    │  "Access-Control-Allow-Origin missing"
    ├─ React vê erro de rede
    ├─ Mostra "Erro ao carregar clientes"
```

---

## 📊 Estados de Sincronização

### State do App.jsx

```javascript
const [clients, setClients] = useState([]);
const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "success",
});
```

### Estado ao longo do tempo:

```
Tempo 0s: App monta
  clients: []
  snackbar: { open: false, message: "", severity: "success" }

Tempo 1s: GET /clientes enviado
  clients: []  (ainda vazio, aguardando resposta)
  snackbar: { open: false }

Tempo 2s: Resposta recebida
  setClients([João, Maria])
  clients: [João, Maria]  ← Atualizado!
  React re-renderiza
  ClientList agora renderiza 2 itens

Tempo 5s: Usuário clica adicionar
  FormDialog abre
  clients: [João, Maria]  (sem mudança ainda)

Tempo 7s: POST /clientes enviado
  clients: [João, Maria]  (pedindo para atualizar)
  setLoading(true)

Tempo 8s: Resposta recebida
  setClients([João, Maria, Pedro])
  clients: [João, Maria, Pedro]  ← Atualizado!
  showSnackbar("Cliente cadastrado!", "success")
  snackbar: { open: true, message: "...", severity: "success" }
  React re-renderiza
  ClientList mostra 3 itens
  Snackbar verde aparece por 4s
```

---

## 🎯 Resumo do Fluxo

| Ação           | Frontend                 | Backend                   | Resultado            |
| -------------- | ------------------------ | ------------------------- | -------------------- |
| **Montar**     | useEffect → getClients   | -                         | Carrega 2 clientes   |
| **Criar**      | POST /clientes com dados | Valida, cria, retorna 201 | Lista tem 3 clientes |
| **Deletar**    | DELETE /clientes/2       | Remove, retorna 204       | Lista tem 2 clientes |
| **Email dup.** | POST /clientes           | Acha email, retorna 409   | Erro em vermelho     |

---

## ✅ Checklist de Integração

- [ ] API rodando em 8080
- [ ] Frontend rodando em 5173
- [ ] api.js com `baseURL: http://localhost:8080`
- [ ] CORS permitindo `http://localhost:5173`
- [ ] clientes.js com dados iniciais (João, Maria)
- [ ] GET /clientes retorna array
- [ ] Frontend recebe dados
- [ ] ClientList renderiza 2 clientes
- [ ] Criar cliente funciona (POST 201)
- [ ] Deletar cliente funciona (DELETE 204)
- [ ] Email duplicado retorna 409
- [ ] Sem erros em console (F12)
