# 🧪 Guia de Teste Manual - FarmUp Challenge

Guia completo para testar o sistema de gerenciamento de clientes.

## 🎉 **SERVIÇOS JÁ ESTÃO RODANDO!**

✅ **API Backend**: http://localhost:8080 - ATIVO  
✅ **Frontend React**: http://localhost:5173 - ATIVO  
✅ **📚 Swagger Docs**: http://localhost:8080/api-docs - NOVO!

---

## 🚀 1. TESTE RÁPIDO (30 SEGUNDOS)

### 🌐 **Acesse o Frontend AGORA:**
**👆 CLIQUE**: [http://localhost:5173](http://localhost:5173)

**O que você deve ver:**
- ✅ Header "FarmaUP Clientes" 
- ✅ Lista com 2 clientes (João Silva e Maria Santos)
- ✅ Botão "+" azul no canto inferior direito
- ✅ Design Material-UI responsivo

### 📡 **Teste a API AGORA:**
**Abra nova aba no navegador e cole:**
- 👆 **API Status**: [http://localhost:8080](http://localhost:8080)
- 👆 **Lista Clientes**: [http://localhost:8080/clientes](http://localhost:8080/clientes)
- 🆕 **📚 Swagger Docs**: [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

---

## 🎯 2. TESTE PRÁTICO DO FRONTEND

### 2.1 ➕ **Criar Novo Cliente**
1. **Na interface**: [http://localhost:5173](http://localhost:5173)
2. **Clicar** no botão "+" (FAB azul)
3. **Preencher** exatamente:
   ```
   Nome: Pedro Oliveira
   Email: pedro@teste.com
   Telefone: (31) 98765-4321
   Cidade: Belo Horizonte
   ```
4. **Clicar** "Salvar"
5. **✅ Verificar**: Cliente aparece na lista (total: 3 clientes)

### 2.2 🚫 **Testar Email Duplicado**
1. **Clicar** no botão "+" novamente
2. **Preencher** com email DUPLICADO:
   ```
   Nome: Outro João
   Email: joao@exemplo.com  ← MESMO EMAIL DO JOÃO SILVA
   Telefone: (11) 88888-8888
   Cidade: São Paulo
   ```
3. **Clicar** "Salvar"
4. **✅ Verificar**: Mensagem de erro vermelha aparece
5. **Clicar** "Cancelar" para fechar

### 2.3 🗑️ **Deletar Cliente**
1. **Clicar** no ícone lixeira (vermelho) do "Pedro Oliveira"
2. **✅ Verificar**: Modal de confirmação aparece
3. **Clicar** "Remover" para confirmar
4. **✅ Verificar**: 
   - Cliente removido da lista
   - Snackbar verde "Cliente removido com sucesso!"
   - Total volta para 2 clientes

---

## 📚 3. NOVA DOCUMENTAÇÃO SWAGGER

### 🎯 **Acesse a Documentação Completa:**
👆 **CLIQUE**: [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

**O que você pode fazer no Swagger:**
- ✅ **Ver todos os endpoints** com detalhes completos
- ✅ **Testar a API diretamente** no navegador
- ✅ **Ver exemplos** de requisições e respostas
- ✅ **Validar schemas** de dados
- ✅ **Explorar recursos bônus** documentados

**💡 Recursos destacados no Swagger:**
- 🔍 **Filtros por cidade e nome** (parâmetros query)
- 🚫 **Validação de email único** (erro 409)
- 📊 **Schemas completos** de Cliente e erros
- 🎯 **Try it out** para testar cada endpoint

---

## 🔧 4. TESTES DA API (Backend) - 12 Testes

### 💎 **TESTE OS RECURSOS BÔNUS AGORA:**

### ✅ Testes Básicos (2.1 - 2.8)

```bash
# 2.1 Status da API
curl http://localhost:8080/
# ✅ Esperado: JSON com endpoints da API

# 2.2 Listar clientes iniciais
curl http://localhost:8080/clientes
# ✅ Esperado: Array com 2 clientes (João Silva e Maria Santos)

# 2.3 Buscar cliente específico
curl http://localhost:8080/clientes/1
# ✅ Esperado: JSON do João Silva

# 2.4 Buscar cliente inexistente
curl http://localhost:8080/clientes/999
# ✅ Esperado: {"erro": "Cliente não encontrado"} (404)

# 2.5 Criar novo cliente
curl -X POST http://localhost:8080/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome": "Ana Costa", "email": "ana@teste.com", "telefone": "(11) 99999-8888", "cidade": "São Paulo"}'
# ✅ Esperado: Cliente criado com ID 3

# 2.6 Validação de campos obrigatórios
curl -X POST http://localhost:8080/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome": "Teste Incompleto"}'
# ✅ Esperado: {"erro": "Todos os campos são obrigatórios"} (400)

# 2.7 Atualizar cliente
curl -X PUT http://localhost:8080/clientes/3 \
  -H "Content-Type: application/json" \
  -d '{"nome": "Ana Costa Silva", "email": "ana.silva@teste.com", "telefone": "(11) 99999-8888", "cidade": "São Paulo"}'
# ✅ Esperado: Cliente atualizado

# 2.8 Deletar cliente
curl -X DELETE http://localhost:8080/clientes/3
# ✅ Esperado: Status 204 (sem conteúdo)
```

### 💎 **BÔNUS - Teste no Navegador (Mais Fácil!)**

**👆 CLIQUE nos links abaixo para testar:**

**🔍 2.10 BÔNUS - Filtro por Cidade:**
- [Clientes de São Paulo](http://localhost:8080/clientes?cidade=São%20Paulo) ← Deve mostrar só João Silva

**🔍 2.11 BÔNUS - Busca por Nome:**
- [Buscar "Maria"](http://localhost:8080/clientes?nome=Maria) ← Deve mostrar só Maria Santos

**🔍 2.12 BÔNUS - Filtros Combinados:**
- [Maria + Rio de Janeiro](http://localhost:8080/clientes?nome=Maria&cidade=Rio%20de%20Janeiro) ← Deve mostrar só Maria Santos

**🔍 Teste Case-Insensitive:**
- [são paulo (minúsculo)](http://localhost:8080/clientes?cidade=são%20paulo) ← Deve mostrar João Silva
- [maria (minúsculo)](http://localhost:8080/clientes?nome=maria) ← Deve mostrar Maria Santos

### 💎 **BÔNUS - Via Linha de Comando (Opcional):**

```bash
# 2.9 BÔNUS - Email duplicado (409 Conflict)
curl -X POST http://localhost:8080/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome": "Outro João", "email": "joao@exemplo.com", "telefone": "(11) 88888-8888", "cidade": "São Paulo"}'
# ✅ Esperado: {"message": "E-mail já cadastrado."} (409)

# Outros testes BÔNUS - Use os links acima (mais fácil!)
```

---

## 🔄 5. INTEGRAÇÃO COMPLETA - TESTE AGORA

### 🎯 **Teste de Sincronização Frontend ↔ Backend:**

1. **Frontend**: [http://localhost:5173](http://localhost:5173) - Criar "Carlos Santos"
2. **API**: [http://localhost:8080/clientes](http://localhost:8080/clientes) - Verificar se Carlos aparece
3. **Frontend**: Deletar "Carlos Santos" 
4. **API**: [http://localhost:8080/clientes](http://localhost:8080/clientes) - Verificar se Carlos sumiu

### 🌐 **Teste CORS no Console do Browser:**
1. **Abrir** [http://localhost:5173](http://localhost:5173)
2. **Pressionar** F12 (Developer Tools)
3. **Ir** na aba "Console"
4. **Colar** e executar:
```javascript
fetch("http://localhost:8080/clientes")
  .then(r => r.json())
  .then(data => console.log("✅ CORS OK:", data))
  .catch(err => console.log("❌ CORS Error:", err));
```
5. **✅ Esperado**: Lista de clientes sem erro CORS

---

## 📊 6. CHECKLIST FINAL - MARQUE CONFORME TESTA

### ✅ API (8/8 básicos + 4/4 bônus)
- [ ] Servidor porta 8080 ativo
- [ ] CRUD completo funcionando  
- [ ] Validações (400, 404, 409)
- [ ] Email único implementado
- [ ] Filtros cidade + nome funcionando
- [ ] Case-insensitive nos filtros
- [ ] Filtros combinados operacionais

### ✅ Frontend (Todos os recursos)
- [ ] Interface porta 5173 ativa
- [ ] Lista carrega automaticamente
- [ ] Criar cliente funciona
- [ ] Deletar com confirmação
- [ ] Validações visuais
- [ ] Design responsivo
- [ ] Notificações (snackbars)

### ✅ Integração (Sincronização)
- [ ] Frontend ↔ Backend sincronizados
- [ ] CORS configurado corretamente
- [ ] Sem erros no console
- [ ] Dados persistentes entre interfaces

---

## 🎯 **RESUMO DOS LINKS PARA TESTE:**

### 🌐 **Frontend (Interface):**
- **Principal**: [http://localhost:5173](http://localhost:5173)

### 📡 **API (Endpoints):**
- **Status**: [http://localhost:8080](http://localhost:8080)
- **📚 Swagger**: [http://localhost:8080/api-docs](http://localhost:8080/api-docs)
- **Listar Clientes**: [http://localhost:8080/clientes](http://localhost:8080/clientes)
- **Filtrar SP**: [http://localhost:8080/clientes?cidade=São%20Paulo](http://localhost:8080/clientes?cidade=São%20Paulo)
- **Buscar Maria**: [http://localhost:8080/clientes?nome=Maria](http://localhost:8080/clientes?nome=Maria)
- **Filtro Combinado**: [http://localhost:8080/clientes?nome=Maria&cidade=Rio%20de%20Janeiro](http://localhost:8080/clientes?nome=Maria&cidade=Rio%20de%20Janeiro)

---

## 🚨 **Se algo não funcionar:**

**💬 Me avise e eu resolvo imediatamente!**

Os serviços estão rodando e funcionais. Qualquer problema, posso:
- ✅ Reiniciar serviços
- ✅ Verificar logs
- ✅ Corrigir configurações
- ✅ Guiar o teste passo a passo

---

## 🏆 **STATUS ATUAL:**

**✅ API Backend**: Rodando na porta 8080  
**✅ Frontend React**: Rodando na porta 5173  
**✅ 📚 Swagger Docs**: Documentação completa disponível  
**✅ CORS**: Configurado e funcionando  
**✅ Dados**: 2 clientes iniciais carregados  
**✅ Todos os 4 bônus**: Implementados e testados  

**🎉 Sistema 100% funcional + Documentação Swagger - TESTE AGORA!**

---

**⏱️ Tempo de teste recomendado:** 5-10 minutos  
**🎯 Foco:** Interface + Links dos bônus**
