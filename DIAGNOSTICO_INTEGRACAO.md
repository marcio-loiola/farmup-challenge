# 🔍 Análise de Integração Front-End e Back-End

## ❌ Problema: Erro ao Encontrar Clientes Inicialmente

### 🎯 Cenário do Problema

Quando você acessa `http://localhost:5173` (frontend), a lista de clientes **não carrega** ou **mostra erro**.

---

## 🔎 Raiz do Problema - 5 Causas Possíveis

### **1️⃣ API não está rodando**

**Sintoma:**

```
Erro no console: "Network Error" ou "Cannot reach 8080"
```

**Verificação:**

```bash
# Terminal 1 - Abra e execute
cd app/api
npm start

# Esperado:
# Servidor rodando em http://localhost:8080
```

**Se der erro:**

```bash
npm install  # Instale as dependências
npm start    # Tente novamente
```

---

### **2️⃣ Frontend apontando URL errada da API**

**Arquivo:** `app/client/src/services/api.js`

**Código atual (correto):**

```javascript
const api = axios.create({
  baseURL: "http://localhost:8080", // ✅ Correto
});
```

**Se estivesse errado seria:**

```javascript
baseURL: "http://localhost:3000"; // ❌ Errado
baseURL: "http://api:8080"; // ❌ Errado (Docker)
baseURL: "https://api.com"; // ❌ Errado (API remota)
```

**Como verificar:**

1. Abra `app/client/src/services/api.js`
2. Confirme que tem `baseURL: 'http://localhost:8080'`
3. Se tiver outro, corrija para `http://localhost:8080`

---

### **3️⃣ CORS não está configurado**

**Arquivo:** `app/api/server.js`

**Código atual (correto):**

```javascript
app.use(
  cors({
    origin: "http://localhost:3000", // ✅ Permite React
    credentials: true,
  })
);
```

**Problema:**

- Frontend está em `http://localhost:5173` (Vite)
- Backend só permite `http://localhost:3000` (Create React App)

**Solução - Alterar para:**

```javascript
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // Ambas
    credentials: true,
  })
);
```

**Ou mais genérico (dev):**

```javascript
app.use(
  cors({
    origin: true, // Permite qualquer origem (apenas em DEV!)
    credentials: true,
  })
);
```

---

### **4️⃣ Endpoint retornando erro 500**

**Arquivo:** `app/api/controllers/clientesController.js`

**Função que carrega:**

```javascript
function listarClientes(req, res) {
  const { cidade, nome } = req.query;
  let resultado = clientesData.obterTodos(); // ← Aqui pode falhar

  if (cidade) {
    resultado = resultado.filter(
      (c) => c.cidade.toLowerCase() === cidade.toLowerCase()
    );
  }

  if (nome) {
    resultado = resultado.filter((c) =>
      c.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  res.json(resultado); // ✅ Retorna array
}
```

**Teste via curl:**

```bash
curl http://localhost:8080/clientes
```

**Esperado:**

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

**Se receber erro, há problema no backend.**

---

### **5️⃣ Dados iniciais não estão carregando no backend**

**Arquivo:** `app/api/data/clientes.js`

**Dados iniciais (correto):**

```javascript
let clientes = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@exemplo.com",
    telefone: "(11) 98765-4321",
    cidade: "São Paulo",
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@exemplo.com",
    telefone: "(21) 91234-5678",
    cidade: "Rio de Janeiro",
  },
];
```

**Se `clientes` estiver vazio (`[]`):**

- A lista ficará vazia
- Nenhum erro aparece (só não mostra dados)

---

## 🔗 Fluxo de Integração Correto

### Sequência esperada:

```
1. App.jsx monta
   ↓
2. useEffect dispara getClients()
   ↓
3. getClients() chama: api.get('/clientes')
   ↓
4. api.js usa axios com baseURL: http://localhost:8080
   ↓
5. Requisição: GET http://localhost:8080/clientes
   ↓
6. Backend recebe em server.js
   ↓
7. Roteia para GET /clientes → router
   ↓
8. Router chama clientesController.listarClientes()
   ↓
9. Controller chama clientesData.obterTodos()
   ↓
10. Retorna array com 2 clientes
   ↓
11. Backend responde: res.json(resultado) [200 OK]
   ↓
12. Frontend recebe resposta
   ↓
13. setClients(response.data) atualiza state
   ↓
14. React re-renderiza ClientList
   ↓
15. Lista mostra 2 clientes ✅
```

### Se quebrar em algum ponto:

| Passo | Erro                      | Checagem               |
| ----- | ------------------------- | ---------------------- |
| 2-3   | "Network Error"           | API rodando em 8080?   |
| 3-5   | "CORS error"              | CORS configurado?      |
| 5-6   | Timeout                   | Firewall bloqueando?   |
| 6-8   | 404 Not Found             | Rota /clientes existe? |
| 8-9   | 500 Internal Server Error | Erro no controller?    |
| 10-11 | Dados vazios              | Clientes.js tem dados? |
| 12-15 | Não mostra na tela        | Erro no React?         |

---

## 🛠️ Checklist de Diagnóstico

### **Passo 1: Verificar se API está rodando**

```bash
# Terminal novo
curl http://localhost:8080/
```

**Esperado:** JSON com endpoints
**Resultado:** ✅ / ❌

---

### **Passo 2: Verificar se endpoint /clientes funciona**

```bash
curl http://localhost:8080/clientes
```

**Esperado:** Array com 2 clientes (João e Maria)
**Resultado:** ✅ / ❌

---

### **Passo 3: Verificar config do frontend**

```bash
# Abra em um editor
cat app/client/src/services/api.js
```

**Esperado:** `baseURL: 'http://localhost:8080'`
**Resultado:** ✅ / ❌

---

### **Passo 4: Verificar CORS no backend**

```bash
# Abra em um editor
cat app/api/server.js | grep -A 5 "cors"
```

**Esperado:** Origin incluir localhost (3000 ou 5173)
**Resultado:** ✅ / ❌

---

### **Passo 5: Verificar dados iniciais**

```bash
# Abra em um editor
cat app/api/data/clientes.js
```

**Esperado:** Array `clientes` com 2 itens
**Resultado:** ✅ / ❌

---

### **Passo 6: Verificar console do React**

```
1. Abra http://localhost:5173
2. Aperte F12 (DevTools)
3. Abra aba Console
4. Procure por erros em vermelho
```

**Resultado:** Que erro aparece?

---

## 🔴 Erros Comuns e Soluções

### **Erro: "Cannot GET /clientes"**

**Causa:** Rota não existe no backend

**Solução:**

```javascript
// Verificar em app/api/server.js
app.use("/clientes", clientesRoutes); // ← Deve existir
```

---

### **Erro: "CORS policy: No 'Access-Control-Allow-Origin'"**

**Causa:** Backend não permite origem do frontend

**Solução 1 - Corrigir origin:**

```javascript
// app/api/server.js
app.use(
  cors({
    origin: "http://localhost:5173", // Adicione localhost:5173
    credentials: true,
  })
);
```

**Solução 2 - Versão desenvolvimento:**

```javascript
// app/api/server.js
app.use(
  cors({
    origin: true, // Permite qualquer origem em DEV
    credentials: true,
  })
);
```

---

### **Erro: "Network Error"**

**Causa 1:** API não está rodando

```bash
# Cheque Terminal da API
cd app/api && npm start
```

**Causa 2:** Porta 8080 ocupada

```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 8080 | Select-Object -ExpandProperty OwningProcess) | Stop-Process -Force

# Linux/Mac
lsof -i :8080 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

**Causa 3:** Firewall bloqueando

- Verifique se 8080 está permitida no firewall

---

### **Erro: "Nenhum cliente cadastrado" (lista vazia)**

**Causa 1:** Dados não inicializaram

```javascript
// app/api/data/clientes.js
let clientes = []; // ❌ Vazio!
```

**Solução:** Repopule com dados iniciais:

```javascript
let clientes = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@exemplo.com",
    telefone: "(11) 98765-4321",
    cidade: "São Paulo",
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@exemplo.com",
    telefone: "(21) 91234-5678",
    cidade: "Rio de Janeiro",
  },
];
```

**Causa 2:** Backend não retorna dados

```bash
# Teste via curl
curl http://localhost:8080/clientes
# Se retorna [], os dados estão vazios no backend
```

---

### **Erro: "400 Bad Request"**

**Causa:** Validação falhou na criação

**Verificação:**

```bash
# Teste com dados inválidos
curl -X POST http://localhost:8080/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome": "Teste"}' # Faltam campos
```

**Resposta esperada:** `{"erro": "Todos os campos são obrigatórios"}`

---

### **Erro: "409 Conflict"**

**Causa:** Email já cadastrado

**Comportamento correto!**

```bash
# Tente criar 2 clientes com mesmo email
curl -X POST http://localhost:8080/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome": "Teste", "email": "joao@exemplo.com", "telefone": "(11) 1111-1111", "cidade": "SP"}'
```

**Resposta esperada:** `{"message": "E-mail já cadastrado"}` (409)

---

## 📋 Teste Passo a Passo

### **Cenário 1: Tudo do zero**

```bash
# Terminal 1 - API
cd app/api
npm install
npm start
# Aguarde: "Servidor rodando em http://localhost:8080"

# Terminal 2 - Frontend
cd app/client
npm install
npm run dev
# Aguarde: "Local: http://localhost:5173"

# Terminal 3 - Teste
curl http://localhost:8080/clientes
# Esperado: Array com João e Maria
```

### **Cenário 2: API rodando mas frontend não carrega**

```bash
# 1. Verifique URL do frontend
# Acesse http://localhost:5173

# 2. Abra DevTools (F12)
# Vá para Console

# 3. Execute
fetch('http://localhost:8080/clientes')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.log('Erro:', e))

# Se der erro, note qual é:
# - "No 'Access-Control-Allow-Origin'" → CORS
# - "Failed to fetch" → Conexão
# - Vazio → Sem dados
```

### **Cenário 3: Ambos rodando mas não integram**

```bash
# 1. Verificar api.js
cat app/client/src/services/api.js
# Deve ter: baseURL: 'http://localhost:8080'

# 2. Verificar CORS
cat app/api/server.js
# Deve ter cors configurado

# 3. Se ok, reinicie ambos:
# Ctrl+C nos 2 terminais
# Reinicie npm start em ambos
```

---

## ✅ Integração OK - Sinais

- ✅ `curl http://localhost:8080/clientes` retorna array com dados
- ✅ Frontend carrega e mostra "Lista de Clientes (2)"
- ✅ Console (F12) não mostra erros vermelhos
- ✅ Criar cliente adiciona na lista
- ✅ Deletar cliente remove da lista

---

## 🎯 Resumo Rápido

| Verificação           | Comando                               | Esperado             |
| --------------------- | ------------------------------------- | -------------------- |
| **API rodando?**      | `curl http://localhost:8080/`         | JSON com endpoints   |
| **Dados existem?**    | `curl http://localhost:8080/clientes` | Array [João, Maria]  |
| **URL correta?**      | `cat app/client/src/services/api.js`  | `localhost:8080`     |
| **CORS ok?**          | `cat app/api/server.js`               | cors configurado     |
| **Frontend carrega?** | Abra `http://localhost:5173`          | Vê lista de clientes |

Se **todos OK** → Integração funcionando! 🚀
