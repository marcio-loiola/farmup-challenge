# 🧪 Guia de Teste Manual - FarmUp Challenge API

Guia prático para testar a API REST manualmente.

---

## 🚀 1. INICIAR A API

### Terminal - API
```bash
cd api
npm install  # Se ainda não instalou
node server.js
```
**Esperado:** `Servidor rodando em http://localhost:8080`

---

## 🧪 2. TESTAR API

### Status da API
```bash
curl http://localhost:8080/
```

### Listar todos os clientes
```bash
curl http://localhost:8080/clientes
```

### Buscar cliente específico
```bash
curl http://localhost:8080/clientes/1
```

### Criar novo cliente
```bash
curl -X POST http://localhost:8080/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Pedro Silva",
    "email": "pedro@teste.com",
    "telefone": "(11) 99999-8888",
    "cidade": "São Paulo"
  }'
```

### Atualizar cliente (use ID do cliente criado)
```bash
curl -X PUT http://localhost:8080/clientes/3 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Pedro Silva Santos",
    "email": "pedro.santos@teste.com", 
    "telefone": "(11) 99999-8888",
    "cidade": "São Paulo"
  }'
```

### Remover cliente
```bash
curl -X DELETE http://localhost:8080/clientes/3
```

### Testar erro 404
```bash
curl http://localhost:8080/clientes/999
```

---

## ✅ 3. CHECKLIST DE VALIDAÇÃO

**API:**
- [ ] Servidor inicia na porta 8080  
- [ ] GET / retorna informações da API
- [ ] GET /clientes retorna lista de clientes
- [ ] GET /clientes/:id retorna cliente específico
- [ ] POST /clientes cria novo cliente
- [ ] PUT /clientes/:id atualiza cliente
- [ ] DELETE /clientes/:id remove cliente
- [ ] Erros 404 funcionam corretamente
- [ ] Validações de campos obrigatórios funcionam

---

## 🔄 4. TESTE COMPLETO (Sequência)

```bash
# 1. Verificar status
curl http://localhost:8080/

# 2. Listar clientes iniciais (deve ter 2)
curl http://localhost:8080/clientes

# 3. Criar cliente
curl -X POST http://localhost:8080/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome": "Ana Costa", "email": "ana@teste.com", "telefone": "(41) 88888-7777", "cidade": "Curitiba"}'

# 4. Verificar se foi criado
curl http://localhost:8080/clientes

# 5. Atualizar o cliente criado
curl -X PUT http://localhost:8080/clientes/3 \
  -H "Content-Type: application/json" \
  -d '{"nome": "Ana Costa Silva", "email": "ana.silva@teste.com", "telefone": "(41) 88888-7777", "cidade": "Curitiba"}'

# 6. Remover o cliente
curl -X DELETE http://localhost:8080/clientes/3

# 7. Verificar remoção (deve retornar 404)
curl http://localhost:8080/clientes/3
```

---

## 🛠️ Ferramentas Alternativas

**GUI para Testes:**
- **Postman**: Crie collection com os endpoints
- **Insomnia**: Client REST alternativo  
- **Thunder Client**: Extensão do VS Code

---

**🎯 Se todos os testes passarem = API está funcionando perfeitamente!**