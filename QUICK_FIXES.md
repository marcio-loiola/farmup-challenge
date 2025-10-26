# 🚀 Quick Fixes - Erros Comuns de Integração

## ⚡ 5 Erros Mais Comuns e Soluções Rápidas

---

## ❌ Erro 1: "Network Error" ao carregar clientes

### Sintoma

```
Frontend console:
Network Error
Lista vazia
"Erro ao carregar clientes"
```

### Causa Provável

**API não está rodando na porta 8080**

### Solução (30 segundos)

**Verificação:**

```bash
# Terminal novo
curl http://localhost:8080/clientes
```

**Se der erro:**

```bash
# Terminal 1 - Matei a API acidentalmente?
cd app/api
npm start

# Se der erro de porta ocupada:
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 8080 | Select-Object -ExpandProperty OwningProcess) | Stop-Process -Force

# Tente novamente
npm start
```

**Verificação:**

```
Esperado: Servidor rodando em http://localhost:8080
```

---

## ❌ Erro 2: CORS - "No 'Access-Control-Allow-Origin'"

### Sintoma

```
Frontend console (F12):
Access to XMLHttpRequest at 'http://localhost:8080/clientes'
from origin 'http://localhost:5173' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present
```

### Causa Provável

**CORS no backend permite 3000, não 5173 (Vite)**

### Arquivo para Alterar

`app/api/server.js`

### Solução (1 minuto)

**Linha atual:**

```javascript
app.use(
  cors({
    origin: "http://localhost:3000", // ❌ Só permite Create React App
    credentials: true,
  })
);
```

**Opção 1 - Adicionar 5173:**

```javascript
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // ✅ Ambas
    credentials: true,
  })
);
```

**Opção 2 - Genérico para desenvolvimento:**

```javascript
app.use(
  cors({
    origin: true, // ✅ Permite qualquer origem (DEV only!)
    credentials: true,
  })
);
```

**Depois:**

```bash
# Reinicie o backend
Ctrl+C (no terminal da API)
npm start
```

**Verificação:**

```bash
# Frontend deve carregar lista normalmente
```

---

## ❌ Erro 3: "Todos os campos são obrigatórios" (Validação)

### Sintoma

```
Clica "Salvar" no formulário
Dialog mostra: "Todos os campos são obrigatórios"
Mesmo tendo preenchido
```

### Causa Provável

**Um dos campos está com espaço ou vazio**

### Verificação (Frontend)

**Arquivo:** `app/client/src/components/ClientForm.jsx`

**Verificar função:**

```javascript
const isFormValid = () => {
  return (
    client.nome.trim() && // Tira espaços
    client.email.trim() &&
    client.telefone.trim() &&
    client.cidade.trim()
  );
};
```

**Debug:**

```javascript
const isFormValid = () => {
  console.log("Validação:", {
    nome: client.nome.trim(),
    email: client.email.trim(),
    telefone: client.telefone.trim(),
    cidade: client.cidade.trim(),
  });

  return (
    client.nome.trim() &&
    client.email.trim() &&
    client.telefone.trim() &&
    client.cidade.trim()
  );
};
```

Abra F12, tente novamente, veja no console qual campo está vazio.

### Solução

**Preencha todos os campos corretamente**

---

## ❌ Erro 4: Email já cadastrado (409)

### Sintoma

```
Tenta criar cliente
Dialog mostra: "Este e-mail já está cadastrado"
Quando tenta com email que já existe
```

### É Normal ✅

**Isso não é erro! É proteção contra duplicação.**

### Se aparecer erro indesejado

**Problema:** Todos os emails retornam 409?

**Verificar em:** `app/api/controllers/clientesController.js`

```javascript
const emailExistente = clientesData.obterTodos().find((c) => c.email === email);

if (emailExistente) {
  return res.status(409).json({ message: "E-mail já cadastrado." });
}
```

**Se der erro:**

```bash
# Teste via curl
curl -X POST http://localhost:8080/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste",
    "email": "novo@teste.com",
    "telefone": "(11) 1111-1111",
    "cidade": "SP"
  }'
```

**Se retorna 409 com email novo → Bug no backend**

---

## ❌ Erro 5: Lista vazia mesmo com dados

### Sintoma

```
Frontend carrega
Lista mostra: "Nenhum cliente cadastrado"
Mas api.get() não retorna erro
```

### Causa Provável

**Dados iniciais em memória estão vazios**

### Arquivo para Verificar

`app/api/data/clientes.js`

### Solução (1 minuto)

**Verificar conteúdo:**

```javascript
let clientes = []; // ❌ Vazio!
```

**Deve ser:**

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

**Depois:**

```bash
# Reinicie o backend
Ctrl+C
npm start
```

**Verificação:**

```bash
curl http://localhost:8080/clientes
# Deve retornar array com 2 clientes
```

---

## 🔍 Diagnóstico Rápido (2 minutos)

### Execute na ordem:

```bash
# 1. API respondendo?
curl http://localhost:8080/

# 2. Clientes existem?
curl http://localhost:8080/clientes

# 3. Criar funciona?
curl -X POST http://localhost:8080/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"Test","email":"test@test.com","telefone":"(11)1111-1111","cidade":"SP"}'

# 4. Lista agora tem 3?
curl http://localhost:8080/clientes
```

**Se tudo retornar dados → Backend OK ✓**

**Se tudo não retornar dados → Frontend OK ✓**

**Se algo falhar → Problema encontrado!**

---

## 📋 Checklist Rápido de Deploy

Antes de declarar "pronto", verifique:

- [ ] `npm start` no api sem erros
- [ ] `npm run dev` no client sem erros
- [ ] `curl http://localhost:8080/clientes` retorna 2 clientes
- [ ] Frontend em `http://localhost:5173` carrega lista
- [ ] Botão "+" funciona (modal abre)
- [ ] Consegue criar cliente novo
- [ ] Consegue deletar cliente
- [ ] Console (F12) sem erros vermelhos
- [ ] Snackbar mostra mensagens

**Se todos OK → Pronto! 🚀**

---

## 🆘 Se Ainda Não Funcionar

### Passo 1: Reset Completo

```bash
# Feche ambos os terminais (Ctrl+C)

# Limpe cache
cd app/api && rm -rf node_modules package-lock.json
cd ../client && rm -rf node_modules package-lock.json

# Reinstale
cd ../api && npm install
npm start  # Aguarde "Servidor rodando"

# Em outro terminal
cd ../client && npm install
npm run dev  # Aguarde "Local: http://localhost:5173"
```

### Passo 2: Verifique Portas

```bash
# Windows PowerShell
# Porta 8080 (API) está em uso?
Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue | Select-Object -Property State, OwningProcess

# Porta 5173 (Frontend) está em uso?
Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue | Select-Object -Property State, OwningProcess

# Se "Established" = já está rodando
# Se vazio = disponível
```

### Passo 3: Teste Manual

```bash
# Em novo terminal (qualquer lugar)
# Teste API
curl -v http://localhost:8080/clientes
# Procure por: 200 OK

# Abra http://localhost:5173 no navegador
# Abra DevTools (F12)
# Vá para Network
# Veja requisições
# Procure por GET /clientes com status 200
```

### Passo 4: Logs Detalhados

**Na API (adicione console.log):**

```javascript
// app/api/controllers/clientesController.js
function listarClientes(req, res) {
  const { cidade, nome } = req.query;
  console.log("📥 GET /clientes recebido");

  let resultado = clientesData.obterTodos();
  console.log("📊 Clientes na memória:", resultado.length);

  if (cidade) {
    resultado = resultado.filter(
      (c) => c.cidade.toLowerCase() === cidade.toLowerCase()
    );
    console.log("🔍 Após filtro cidade:", resultado.length);
  }

  if (nome) {
    resultado = resultado.filter((c) =>
      c.nome.toLowerCase().includes(nome.toLowerCase())
    );
    console.log("🔍 Após filtro nome:", resultado.length);
  }

  console.log("✅ Retornando:", resultado);
  res.json(resultado);
}
```

**Na API (teste):**

```bash
npm start
# Veja os logs no terminal conforme faz requisições
```

### Passo 5: Limpe Dados (Reset de Memória)

**Se dados ficaram inconsistentes:**

```javascript
// app/api/data/clientes.js
// Resete para inicial

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

let proximoId = 3;

// ... resto do arquivo
```

**Reinicie:**

```bash
Ctrl+C (na API)
npm start
```

---

## 📞 Contato com Suporte

Se depois de tudo ainda não funcionar, forneça:

1. **Output do `npm start` (API):**

   ```bash
   npm start 2>&1 | head -20
   ```

2. **Output do `npm run dev` (Frontend):**

   ```bash
   npm run dev 2>&1 | head -20
   ```

3. **Curl request/response:**

   ```bash
   curl -v http://localhost:8080/clientes
   ```

4. **Console do navegador (F12 → Console):**

   - Screenshot do erro

5. **Versões:**
   ```bash
   node --version
   npm --version
   ```

---

## 🎉 Sucesso!

Quando ver:

- ✅ Lista de 2 clientes carregando
- ✅ Consegue criar cliente novo
- ✅ Consegue deletar cliente
- ✅ Sem erros no console

**Integração pronta para produção! 🚀**
