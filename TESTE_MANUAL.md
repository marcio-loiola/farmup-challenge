# 🧪 Guia de Teste Manual - FarmUp Challenge

Guia completo para testar o sistema de gerenciamento de clientes.

---

## 🚀 1. PREPARAÇÃO DOS TESTES

### Instalar Dependências

```bash
# Na raiz do projeto
npm install
```

### Iniciar os Serviços

**Terminal 1 - API Backend:**

```bash
cd app/api
npm start
```

✅ **Esperado:** `Servidor rodando em http://localhost:8080`

**Terminal 2 - Cliente Frontend:**

```bash
cd app/client
npm run dev
```

✅ **Esperado:** `Local: http://localhost:5173/`

---

## 🔧 2. TESTES DA API (Backend)

### 2.1 Status da API

```bash
curl http://localhost:8080/
```

✅ **Esperado:** JSON com informações da API e endpoints

### 2.2 Listar Clientes Iniciais

```bash
curl http://localhost:8080/clientes
```

✅ **Esperado:** Array com 2 clientes (João Silva e Maria Santos)

### 2.3 Buscar Cliente Específico

```bash
curl http://localhost:8080/clientes/1
```

✅ **Esperado:** JSON do João Silva

### 2.4 Buscar Cliente Inexistente

```bash
curl http://localhost:8080/clientes/999
```

✅ **Esperado:** `{"erro": "Cliente não encontrado"}` (404)

### 2.5 Criar Novo Cliente

```bash
curl -X POST http://localhost:8080/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ana Costa",
    "email": "ana@teste.com",
    "telefone": "(11) 99999-8888",
    "cidade": "São Paulo"
  }'
```

✅ **Esperado:** JSON do cliente criado com ID 3

### 2.6 Testar Validação (Campos Obrigatórios)

```bash
curl -X POST http://localhost:8080/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome": "Teste Incompleto"}'
```

✅ **Esperado:** `{"erro": "Todos os campos são obrigatórios"}` (400)

### 2.7 Atualizar Cliente

```bash
curl -X PUT http://localhost:8080/clientes/3 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ana Costa Silva",
    "email": "ana.silva@teste.com",
    "telefone": "(11) 99999-8888",
    "cidade": "São Paulo"
  }'
```

✅ **Esperado:** JSON do cliente atualizado

### 2.8 Deletar Cliente

```bash
curl -X DELETE http://localhost:8080/clientes/3
```

✅ **Esperado:** Status 204 (sem conteúdo)

### 2.10 **BÔNUS 1: Testar Email Duplicado (409 Conflict)**
```bash
# 1. Criar cliente
curl -X POST http://localhost:8080/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome": "Pedro Lima", "email": "pedro@teste.com", "telefone": "(31) 99999-9999", "cidade": "Belo Horizonte"}'

# 2. Tentar criar com mesmo email
curl -X POST http://localhost:8080/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome": "Outro Pedro", "email": "pedro@teste.com", "telefone": "(11) 88888-8888", "cidade": "São Paulo"}'
```
✅ **Esperado:** Segunda requisição retorna erro 409 "E-mail já cadastrado"

### 2.11 **BÔNUS 2: Filtro por Cidade**
```bash
# Filtrar clientes de São Paulo
curl "http://localhost:8080/clientes?cidade=São Paulo"

# Teste case-insensitive
curl "http://localhost:8080/clientes?cidade=são paulo"
```
✅ **Esperado:** Apenas clientes da cidade especificada

### 2.12 **BÔNUS 3: Busca por Nome Parcial**
```bash
# Buscar por parte do nome
curl "http://localhost:8080/clientes?nome=João"

# Buscar case-insensitive  
curl "http://localhost:8080/clientes?nome=maria"
```
✅ **Esperado:** Clientes com "João" ou "maria" em qualquer parte do nome

### 2.9 Verificar Deleção
```bash
curl http://localhost:8080/clientes/3
```
✅ **Esperado:** `{"erro": "Cliente não encontrado"}` (404)


```bash
curl http://localhost:8080/clientes/3
```

✅ **Esperado:** `{"erro": "Cliente não encontrado"}` (404)

---

# Status 16:40 - tudo ok até aqui

## 🌐 3. TESTES DO FRONTEND (Interface)

### 3.1 Acessar Interface

1. **Abrir:** http://localhost:5173
2. **Verificar:**
   - Header "FarmaUP Clientes" aparece
   - Lista de clientes carrega automaticamente
   - 2 clientes iniciais são exibidos

### 3.2 Visualizar Lista de Clientes

**O que verificar:**

- ✅ Nome, email, telefone e cidade aparecem
- ✅ Botão de delete (ícone lixeira) em cada item
- ✅ Design Material-UI funcionando

### 3.3 Criar Novo Cliente

1. **Clicar** no botão "+" (FAB azul no canto inferior direito)
2. **Preencher** formulário modal:
   - Nome: Pedro Oliveira
   - Email: pedro@teste.com
   - Telefone: (31) 98765-4321
   - Cidade: Belo Horizonte
3. **Clicar** "Salvar"
4. **Verificar:**
   - ✅ Modal fecha
   - ✅ Cliente aparece na lista
   - ✅ Total de clientes: 3

### 3.4 Deletar Cliente

1. **Clicar** no ícone lixeira (vermelho) de um cliente
2. **Verificar:** Modal de confirmação aparece
3. **Clicar** "Remover" para confirmar
4. **Verificar:**
   - ✅ Cliente remove da lista imediatamente
   - ✅ Snackbar de sucesso aparece
   - ✅ Contador de clientes diminui

### 3.5 Testar Responsividade

1. **Redimensionar** janela do browser
2. **Verificar:** Interface se adapta a telas menores

---

## 🔄 4. TESTE DE INTEGRAÇÃO COMPLETA

### 4.1 Fluxo Completo

Execute esta sequência para testar integração:

1. **API** - Listar clientes iniciais
2. **Frontend** - Verificar se mesmos clientes aparecem
3. **Frontend** - Criar cliente "Carlos Santos"
4. **API** - Verificar se cliente foi criado: `curl http://localhost:8080/clientes`
5. **Frontend** - Deletar "Carlos Santos"
6. **API** - Verificar se foi removido

### 4.2 Teste CORS

**No Console do Browser (F12):**

```javascript
fetch("http://localhost:8080/clientes")
  .then((r) => r.json())
  .then((data) => console.log("✅ CORS OK:", data))
  .catch((err) => console.log("❌ CORS Error:", err));
```

✅ **Esperado:** Lista de clientes sem erro CORS

---

## 🐳 5. TESTE COM DOCKER (Opcional)

### 5.1 Ambiente de Desenvolvimento

```bash
docker-compose up dev
```

- **API:** http://localhost:8080
- **Client:** http://localhost:5173

### 5.2 Ambiente de Produção

```bash
docker-compose up api client
```

- **API:** http://localhost:8080
- **Client:** http://localhost:3000

**Repetir testes das seções 2, 3 e 4**

---

## 📊 6. CHECKLIST DE VALIDAÇÃO

### ✅ API Backend

- [ ] Servidor inicia sem erros (porta 8080)
- [ ] GET / retorna informações da API
- [ ] GET /clientes retorna 2 clientes iniciais
- [ ] GET /clientes/:id funciona (sucesso + erro 404)
- [ ] POST /clientes cria cliente
- [ ] POST com dados inválidos retorna erro 400
- [ ] PUT /clientes/:id atualiza cliente
- [ ] DELETE /clientes/:id remove cliente
- [ ] CORS permite requisições do frontend

### ✅ Bônus API (Diferenciais)

- [ ] **Email único**: POST com email duplicado retorna 409
- [ ] **Filtro cidade**: `?cidade=São Paulo` filtra corretamente
- [ ] **Busca nome**: `?nome=João` encontra nomes parciais
- [ ] **Case-insensitive**: Filtros funcionam com maiúscula/minúscula
- [ ] **Filtros combinados**: `?cidade=X&nome=Y` funciona

### ✅ Frontend React

- [ ] Interface carrega sem erros (porta 5173)
- [ ] Header "FarmaUP Clientes" aparece
- [ ] Lista de clientes carrega automaticamente
- [ ] Botão "+" abre modal de criação
- [ ] Formulário cria cliente corretamente
- [ ] Botão delete remove cliente da lista
- [ ] Design Material-UI funcionando
- [ ] Responsivo em diferentes tamanhos

### ✅ Integração

- [ ] Frontend carrega dados da API
- [ ] Criar cliente no frontend aparece na API
- [ ] Deletar cliente no frontend remove da API
- [ ] Sem erros de CORS no console
- [ ] Requisições HTTP funcionando

### ✅ Docker (Se testado)

- [ ] `docker-compose up dev` funciona
- [ ] `docker-compose up api client` funciona
- [ ] Portas corretas expostas
- [ ] Mesmas funcionalidades funcionam

---

## 🚨 7. POSSÍVEIS PROBLEMAS E SOLUÇÕES

### Problema: API não inicia

```bash
# Solução: Instalar dependências
cd apps/api && npm install
```

### Problema: Frontend não carrega clientes

```bash
# Verificar se API está rodando
curl http://localhost:8080/clientes
```

### Problema: Erro CORS

- Verificar se API tem `cors` instalado
- Confirmar URL da API no `apps/client/src/services/api.js`

### Problema: Port já em uso

```bash
# Windows: Matar processo na porta
netstat -ano | findstr :8080
taskkill /PID <número_do_pid> /F
```

---

## 🎯 RESULTADO ESPERADO

**✅ Sucesso Total:**

- API respondendo todos endpoints
- Frontend carregando e interagindo
- Integração completa funcionando
- CRUD completo operacional

**🎉 Se todos os testes passaram: Sistema aprovado para avaliação!**

---

**💡 Dica:** Execute os testes na ordem apresentada para melhor validação!
