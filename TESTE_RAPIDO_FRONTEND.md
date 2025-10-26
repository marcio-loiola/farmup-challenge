# ⚡ TESTE RÁPIDO FRONTEND - 5 Minutos

Validação express para verificar se tudo funciona.

---

## 🚀 **SETUP (30s)**
```bash
# Terminal 1
cd app/api && npm start

# Terminal 2  
cd app/client && npm run dev

# Browser
http://localhost:5173
```

---

## ✅ **CHECKLIST RÁPIDO**

### **1. Inicialização (15s)**
- [ ] Header "FarmaUP Clientes" aparece
- [ ] Lista mostra "(2)" clientes 
- [ ] João Silva e Maria Santos visíveis
- [ ] FAB azul "+" no canto inferior direito

### **2. Cadastro Sucesso (60s)**
- [ ] Clicar FAB "+"
- [ ] Preencher: Nome="Ana", Email="ana@teste.com", Telefone="11999999999", Cidade="SP"
- [ ] Clicar "Salvar"
- [ ] ✅ Modal fecha + Snackbar verde + Lista mostra "(3)"

### **3. Validação Email Duplicado (45s)**
- [ ] Clicar FAB "+"
- [ ] Preencher: Nome="João2", Email="joao@exemplo.com", Telefone="11888888888", Cidade="RJ"
- [ ] Clicar "Salvar"
- [ ] ✅ Alert vermelho "Este e-mail já está cadastrado"

### **4. Validação Campos Vazios (30s)**
- [ ] Clicar FAB "+"
- [ ] Preencher só Nome="Pedro"
- [ ] ✅ Botão "Salvar" está desabilitado (cinza)

### **5. Delete com Confirmação (45s)**
- [ ] Clicar lixeira (vermelho) de um cliente
- [ ] ✅ Modal "Tem certeza que deseja remover..."
- [ ] Clicar "Remover"
- [ ] ✅ Cliente sai da lista + Snackbar verde

### **6. Responsivo Mobile (30s)**
- [ ] F12 → Toggle device toolbar → iPhone
- [ ] ✅ Interface se adapta
- [ ] ✅ FAB continua acessível

### **7. Formulário Limpa (15s)**
- [ ] Abrir modal, preencher dados, salvar com sucesso
- [ ] Abrir modal novamente
- [ ] ✅ Campos estão vazios

---

## 🎯 **RESULTADO**

**✅ 7/7 PASSOU**: Frontend perfeito! 🚀  
**❌ Falhou**: Verificar logs do console + TESTE_FRONTEND.md completo

---

## 🔥 **PRÓXIMAS MELHORIAS (Opcional)**

Se tudo passou, considere implementar:

1. **🔍 Campo de Busca** (15min)
   ```jsx
   // Em ClientList.jsx - adicionar antes da lista
   <TextField 
     placeholder="Buscar cliente..." 
     onChange={(e) => setFiltro(e.target.value)}
   />
   ```

2. **✏️ Botão Editar** (20min)
   ```jsx
   // Adicionar botão edit ao lado do delete
   <IconButton onClick={() => handleEdit(client)}>
     <EditIcon />
   </IconButton>
   ```

3. **📱 Máscara Telefone** (10min)
   ```jsx
   // No TextField telefone
   onChange={(e) => {
     let phone = e.target.value.replace(/\D/g, '');
     phone = phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
     setClient({...client, telefone: phone});
   }}
   ```

---

**⏱️ Total: 5min teste + 45min melhorias opcionais**