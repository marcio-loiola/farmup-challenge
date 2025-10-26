# ✅ CHECKLIST SIMPLES - FarmUp Challenge

Validação rápida + melhorias básicas.

---

## 🧪 **TESTE EM 3 MINUTOS**

```bash
# 1. Iniciar serviços
cd app/api && npm start    # Porta 8080
cd app/client && npm run dev  # Porta 5173
```

### **Validação:**
- [ ] ✅ Lista mostra 2 clientes (João e Maria)
- [ ] ✅ Cadastrar cliente novo funciona
- [ ] ✅ Email duplicado mostra erro vermelho
- [ ] ✅ Delete confirma antes de remover
- [ ] ✅ Campos vazios não permitem salvar

**Se tudo passou: Frontend OK! 🎉**

---

## 💡 **2 MELHORIAS RÁPIDAS (Opcional)**

### **1. Busca na Lista (10min)**
Arquivo: `app/client/src/components/ClientList.jsx`

Adicionar antes da `<List>`:
```jsx
<TextField
  placeholder="🔍 Buscar cliente..."
  onChange={(e) => setFiltro(e.target.value)}
  sx={{ m: 2, width: '100%' }}
/>
```

### **2. Máscara Telefone (5min)**  
Arquivo: `app/client/src/components/ClientForm.jsx`

No TextField telefone, trocar `onChange`:
```jsx
onChange={(e) => {
  let phone = e.target.value.replace(/\D/g, '');
  phone = phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  setClient({...client, telefone: phone});
}}
```

---

## 🎯 **STATUS PROJETO**

✅ **Backend**: Perfeito (todos bônus implementados)  
✅ **Frontend**: Funcional (integrações OK)  
✅ **Documentação**: Completa  

**Pronto para processo seletivo! 🚀**