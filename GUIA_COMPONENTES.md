# 📚 Guia de Componentes - FarmaUP Clientes

## 🎯 Visão Geral da Arquitetura

Sua aplicação segue uma arquitetura **hierárquica em camadas** com responsabilidades bem definidas:

```
App.jsx (Controlador Principal)
  ↓
MainLayout (Container Estrutural)
  ├─→ Header (Barra de Navegação)
  ├─→ ContentWrapper (Gerenciador de Espaçamento)
  ├─→ ClientList (Exibição de Dados)
  ├─→ ClientForm (Entrada de Dados)
  └─→ Snackbar (Notificações)
```

---

## 📋 Componente 1: MainLayout.jsx

### O que faz?

É o **container raiz** que estrutura toda a aplicação verticalmente.

### Estrutura

```
┌─────────────────────────────────────┐
│         MainLayout                   │
│  (flex-column, 100vh, #f5f5f5)      │
├─────────────────────────────────────┤
│  - Header                           │
│  - ContentWrapper/Conteúdo          │
│  - Snackbar                         │
└─────────────────────────────────────┘
```

### Detalhes Técnicos

| Propriedade                | Valor  | Significado                  |
| -------------------------- | ------ | ---------------------------- |
| `display: flex`            | flex   | Habilita flexbox             |
| `flexDirection: column`    | column | Empilha filhos verticalmente |
| `minHeight: 100vh`         | 100vh  | Ocupa toda altura da tela    |
| `backgroundColor: #f5f5f5` | cinza  | Cor de fundo para contraste  |

### Como Funciona

- **Recebe `children`** como propriedade
- **Renderiza os filhos** na ordem que recebe
- **Flexbox Vertical**: Componentes empilhados de cima para baixo
- **100vh de altura**: Garante que sempre preenche a tela

### Quando Modificar

- ✏️ Mudar cor de fundo geral da app
- ✏️ Ajustar espaçamento entre componentes principais
- ✏️ Adicionar novo componente global (ex: Sidebar)

---

## 🎨 Componente 2: Header.jsx

### O que faz?

Exibe a **barra de navegação superior** com o nome da aplicação.

### Estrutura

```
┌──────────────────────────────────────┐
│  AppBar (position: sticky)           │
├──────────────────────────────────────┤
│  Toolbar (altura responsiva)         │
│  └─ Typography: "FarmaUP Clientes"   │
└──────────────────────────────────────┘
```

### Detalhes Técnicos

#### Responsividade com `useMediaQuery`

```javascript
const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
// ✅ true em telas pequenas (< 600px)
// ❌ false em telas maiores
```

#### Mudanças Responsivas

| Propriedade            | Mobile | Desktop | Efeito                         |
| ---------------------- | ------ | ------- | ------------------------------ |
| `minHeight`            | 56px   | 64px    | Header mais compacto no mobile |
| `paddingLeft/Right`    | 8px    | 24px    | Menos espaçamento em mobile    |
| `variant` (Typography) | h6     | h5      | Texto menor no mobile          |

### Como Funciona

1. **`position: sticky`**: Header fica no topo ao fazer scroll (não sai de vista)
2. **`flexShrink: 0`**: Header não encolhe, sempre ocupa seu espaço
3. **`boxShadow`**: Cria sombra sutil para separação visual
4. **Responsividade**: Se mobile, reduz padding e tamanho de fonte

### Quando Modificar

- ✏️ Mudar título ou logo
- ✏️ Adicionar menu/links
- ✏️ Mudar cores ou estilos
- ✏️ Adicionar ícones de perfil/logout

---

## 📝 Componente 3: ClientList.jsx

### O que faz?

Exibe a **lista de clientes** em um card com scroll interno.

### Estrutura

```
┌──────────────────────────────────┐
│  Paper (Card)                     │
├──────────────────────────────────┤
│ ┌─ Header (Fixo)                │
│ │  "📋 Lista de Clientes (5)"    │
│ ├────────────────────────────────┤
│ │ ┌─ Scroll Area (Dinâmico)    │
│ │ │  - ListItem (Cliente 1)    │
│ │ │  - ListItem (Cliente 2)    │
│ │ │  - ListItem (Cliente 3)    │
│ │ └─ "Nenhum cliente" (vazio)   │
│ └─                              │
└──────────────────────────────────┘
```

### Estado Local (State)

```javascript
const [deleteDialog, setDeleteDialog] = useState({
  open: false, // Modal aberto?
  client: null, // Cliente selecionado para deletar
});
```

### Detalhes Técnicos

#### 1. **Paper (Card Container)**

```javascript
sx={{
  height: "100%",        // Ocupa 100% do espaço disponível
  overflow: "hidden",    // Esconde scroll bar default
}}
```

- **`height: 100%`**: Preenche todo o espaço do container pai
- **`overflow: hidden`**: Garante que o scroll seja só dentro do Box interno

#### 2. **Header Fixo**

```javascript
sx={{
  flexShrink: 0,       // Não encolhe quando há scroll
  borderBottom: "1px solid #e0e0e0"  // Separa visualmente
}}
```

- **`flexShrink: 0`**: Header mantém altura mesmo com muito conteúdo
- Padding responsivo: 12px (mobile) → 16px (desktop)

#### 3. **Scroll Area**

```javascript
sx={{
  flex: 1,             // Ocupa espaço restante
  overflow: "auto",    // Ativa scroll interno
  display: "flex",
  flexDirection: "column"
}}
```

- **`flex: 1`**: Expande para ocupar espaço entre header e rodapé
- **`overflow: auto`**: Scroll aparece quando necessário

#### 4. **Estados da Lista**

**Quando lista vazia:**

```javascript
<Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%", // Centra no meio do espaço
  }}
>
  Nenhum cliente cadastrado
</Box>
```

**Quando há clientes:**

```javascript
clients.map((client, index) => (
  <ListItem key={client.id} {...props}>
    {/* Renderiza cada cliente */}
  </ListItem>
));
```

#### 5. **Responsividade em Itens**

| Aspecto      | Mobile           | Desktop         |
| ------------ | ---------------- | --------------- |
| Tamanho nome | 0.95rem          | 1rem            |
| Layout info  | Bloco (quebrado) | Inline (com \|) |
| Padding      | 8px Y / 12px X   | 12px Y / 16px X |
| Ícone delete | small            | medium          |

### Como Funciona o Fluxo de Deleção

```
1. Usuário clica ❌ (DeleteIcon)
   ↓
2. handleDeleteClick(client)
   → Abre Dialog com confirmação
   ↓
3. Usuário clica "Remover"
   ↓
4. handleDeleteConfirm()
   → Chama deleteClient() (vindo do App.jsx)
   → Fecha Dialog
   ↓
5. Backend deleta, componente se re-renderiza
```

### Quando Modificar

- ✏️ Adicionar colunas (CPF, data, status)
- ✏️ Mudar layout da lista para tabela
- ✏️ Adicionar filtros/busca
- ✏️ Adicionar edição de cliente
- ✏️ Mudar cores ou ícones

---

## 📋 Componente 4: ClientForm.jsx

### O que faz?

Gerencia o **formulário para adicionar cliente** com renderização diferente por device.

### Estado Local (State)

```javascript
const [open, setOpen] = useState(false); // Dialog aberto?
const [client, setClient] = useState({
  // Dados do form
  nome: "",
  email: "",
  telefone: "",
  cidade: "",
});
const [loading, setLoading] = useState(false); // Enviando?
const [error, setError] = useState(""); // Erro do form?
```

### Estrutura Desktop vs Mobile

#### Desktop (lg+)

```
┌────────────────────────┐
│  Paper Card            │
│  (sticky, top: 24px)   │
├────────────────────────┤
│  [Adicionar Cliente]   │
│  (sempre visível)      │
└────────────────────────┘
     + Dialog quando clica
```

#### Mobile (<lg)

```
┌─────────────────────────────────────┐
│  Fab (flutuante no canto)           │
│  (position: fixed, bottom: 16px)    │
└─────────────────────────────────────┘
     + Dialog quando clica
```

### Detalhes Técnicos

#### 1. **Responsividade com renderização condicional**

```javascript
if (isDesktop) {
  // Renderiza Paper + Botão normal
} else {
  // Renderiza Fab flutuante
}
```

- **Uma lógica, duas UIs** diferentes
- Não duplica Dialog (compartilhado)

#### 2. **Desktop: Paper Card**

```javascript
sx={{
  height: "fit-content",      // Ajusta ao conteúdo
  position: "sticky",         // Segue scroll
  top: "24px",               // Distância do topo
}}
```

- Fica ao lado da lista em desktop
- Segue o scroll sem sair de vista

#### 3. **Mobile: Fab Flutuante**

```javascript
sx={{
  position: "fixed",          // Fixo na tela
  bottom: 16,
  right: 16,
  zIndex: 1000,              // Acima de tudo
}}
```

- Não interfere com o conteúdo
- Sempre acessível com um clique

#### 4. **Dialog (Compartilhado)**

- Mesmo Dialog em desktop e mobile
- Se abre ao clicar no botão ou Fab

### Como Funciona o Fluxo do Formulário

```
1. Usuário clica [Adicionar] ou Fab(+)
   ↓
2. handleClickOpen()
   → setOpen(true)
   → limpa erro anterior
   ↓
3. Dialog abre, usuário preenche campo
   ↓
4. handleChange(event)
   → atualiza state do cliente
   → limpa erro anterior
   ↓
5. Usuário clica "Salvar"
   ↓
6. handleSubmit()
   → isFormValid()? Valida
   → setLoading(true)
   → await addClient(client)
   ↓
7. Se sucesso:
   → handleClose() (limpa form)
   → App.jsx recebe novo cliente
   → Snackbar mostra mensagem
   ↓
8. Se erro (409 = email duplicado):
   → setError("Este e-mail já está cadastrado")
   → setLoading(false)
   → Usuário vê erro no Dialog
```

### Validação do Formulário

```javascript
isFormValid() {
  return (
    client.nome.trim() &&       // Não vazio + sem espaços
    client.email.trim() &&
    client.telefone.trim() &&
    client.cidade.trim()
  );
}
```

**O que acontece:**

- ❌ Se inválido: Botão "Salvar" desabilitado
- ✅ Se válido: Botão habilitado (pode enviar)
- 📨 Campo vazio = falso = form inválido

### Tratamento de Erros

```javascript
try {
  await addClient(client);
  handleClose(); // Sucesso!
} catch (err) {
  if (err.response?.status === 409) {
    setError("Este e-mail já está cadastrado");
  } else {
    setError("Erro ao cadastrar cliente");
  }
} finally {
  setLoading(false); // Para spinner em qualquer caso
}
```

**Tratamentos:**

- **409**: Email duplicado (erro específico)
- **Outro erro**: Mensagem genérica
- **Finally**: Sempre para o loading

### Props Recebidas

```javascript
ClientForm({ addClient });
```

- **`addClient`**: Função vinda do App.jsx para enviar ao backend
- App passa a função, formulário a chama com dados preenchidos

### Quando Modificar

- ✏️ Adicionar novos campos (CEP, CPF, etc)
- ✏️ Mudar validação
- ✏️ Adicionar máscara de entrada (tel, CPF)
- ✏️ Adicionar upload de arquivo
- ✏️ Mudar mensagens de erro
- ✏️ Adicionar edição além de criação

---

## 🎁 Componente 5: ContentWrapper.jsx

### O que faz?

**Gerenciador de espaçamento e padding** entre componentes.

### Status

⚠️ **Atualmente NÃO ESTÁ SENDO USADO** no App.jsx atual!

O App.jsx usa **Box direto** com padding responsivo em vez disso.

### Estrutura

```
ContentWrapper
  ├─ flex: 1 (ocupa espaço)
  ├─ flexDirection: column
  ├─ padding responsivo: 12px → 16px → 24px
  ├─ gap: 12px → 16px
  └─ {children}
```

### Como Funcionaria

```javascript
// Exemplo de uso (não está em uso):
<ContentWrapper>
  <ClientList />
  <ClientForm />
</ContentWrapper>
```

Aplicaria padding e gap automaticamente.

### Por que não está sendo usado?

- **App.jsx** controla diretamente os Box containers
- Melhor controle sobre flexbox e breakpoints
- Componente fica mais flexível sem wrapper intermediário

### Se Quisesse Reativar

Seria útil se tivesse **múltiplos layouts** diferentes, cada um com seu padding específico.

---

## 🔄 Fluxo de Dados: App.jsx

### Estrutura de State

```javascript
const [clients, setClients] = useState([]); // Lista de clientes
const [snackbar, setSnackbar] = useState({
  // Notificações
  open: false,
  message: "",
  severity: "success",
});
```

### Fluxos de Dados Principais

#### 1️⃣ Carregar Clientes (ao montar)

```
useEffect() → getClients() → api.get('/clientes')
  ↓
if sucesso:
  → setClients(response.data)
  → ClientList recebe nova lista
if erro:
  → showSnackbar("Erro ao carregar", "error")
```

#### 2️⃣ Adicionar Cliente

```
ClientForm
  → handleSubmit()
  → addClient(client) [function do App]
  ↓
if sucesso:
  → setClients([...clients, response.data])
  → showSnackbar("Cadastrado!", "success")
if erro:
  → form mostra erro
```

#### 3️⃣ Deletar Cliente

```
ClientList
  → handleDeleteConfirm()
  → deleteClient(id) [function do App]
  ↓
if sucesso:
  → setClients(clients.filter(...))
  → showSnackbar("Removido!", "success")
if erro:
  → showSnackbar("Erro!", "error")
```

---

## 🎯 Oportunidades de Refinamento

### 1. **Separar Repetição do Dialog**

**Problema**: ClientForm tem Dialog duplicado (desktop + mobile)

**Solução**: Extrair Dialog em componente separado

```
ClientFormDialog.jsx (novo)
  ├─ Recebe: open, onClose, onSubmit
  └─ Retorna: <Dialog>...</Dialog>
```

### 2. **Adicionar Edição de Cliente**

**Atual**: Só deleta
**Novo**: Clicar no cliente para editar

**Mudanças necessárias**:

- Adicionar estado de edição
- Novo endpoint PATCH/PUT
- Dialog editável em ClientForm

### 3. **Busca/Filtro**

**Adicionar header com campo de busca**

```
<Header>
  ├─ Título
  └─ SearchBar (novo componente)
```

### 4. **Paginação**

**Problema**: Muitos clientes carregam tudo
**Solução**: Lazy load ou paginação

### 5. **Validação de Email**

**Atual**: Texto simples
**Melhor**: Regex ou biblioteca

```javascript
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

### 6. **Masks de Input**

**Para**: telefone (99) 99999-9999
**Usar**: `react-input-mask` ou similar

### 7. **Loading State Melhorado**

**Atual**: Dialog desaparece durante envio
**Melhor**: Skeleton loader na lista enquanto carrega

### 8. **Tratamento de Erros Genérico**

**Centralizar** erros em um context/hook:

```
useSnackbar.js (hook customizado)
```

### 9. **Confirmação ao Sair do Form**

Se usuário preenche e clica fora → pedir confirmação

### 10. **Dark Mode**

Usar `useMediaQuery` para detectar `prefers-color-scheme`

---

## 📖 Mapa de Modificações Comum

### Quero adicionar um novo campo ao formulário:

1. Abrir `ClientForm.jsx`
2. Adicionar em `useState({ ..., novoField: "" })`
3. Adicionar `<TextField>` novo
4. Adicionar em `isFormValid()`

### Quero mudar cores:

1. Mudar `backgroundColor` nos `sx={}`
2. Cores principais em cada componente:
   - Header: `#1976d2` (azul)
   - MainLayout: `#f5f5f5` (cinza)
   - Texto destaque: `#1976d2`

### Quero adicionar um novo campo na lista:

1. Abrir `ClientList.jsx`
2. Adicionar em `<ListItemText secondary>`
3. Adicionar emoji e formatação responsiva

### Quero adicionar uma ação rápida:

1. Abrir `ClientList.jsx`
2. Adicionar IconButton em `secondaryAction`
3. Criar função `handleActionClick`

---

## 🚀 Resumo Técnico Rápido

| Componente         | Tipo         | Responsabilidade | Estado            |
| ------------------ | ------------ | ---------------- | ----------------- |
| **MainLayout**     | Container    | Estrutura base   | Nenhum            |
| **Header**         | UI           | Barra superior   | Responsividade    |
| **ClientList**     | Apresentação | Exibir clientes  | Dialog de delete  |
| **ClientForm**     | Entrada      | Formulário novo  | Form + Dialog     |
| **ContentWrapper** | Container    | Espaçamento      | ❌ Não usado      |
| **App.jsx**        | Controlador  | Orquestra tudo   | clients, snackbar |

---

## 💡 Conceitos Importantes

### useMediaQuery (Responsividade)

```javascript
const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
// Retorna true/false, re-renderiza quando muda
```

### flexbox

```javascript
sx={{
  display: "flex",
  flexDirection: "column",  // Vertical
  flex: 1,                  // Ocupa espaço disponível
  gap: "16px"              // Espaço entre filhos
}}
```

### Material-UI (MUI)

- **Box**: Container genérico
- **Paper**: Card com elevation
- **Typography**: Texto com estilos
- **Button, Dialog, TextField**: Componentes prontos

### Estado (useState)

```javascript
const [valor, setValor] = useState(inicial);
// Quando setValor muda → componente re-renderiza
```

---

## ✅ Checklist para Entender o Código

- [ ] Entendo por que MainLayout é flexbox column
- [ ] Entendo o que `sticky` faz no Header
- [ ] Entendo como ClientList tem scroll interno
- [ ] Entendo quando ClientForm renderiza Desktop vs Mobile
- [ ] Entendo o fluxo: clique → estado → re-render
- [ ] Entendo por que `flex: 1` faz algo ocupar espaço
- [ ] Entendo useMediaQuery e responsividade
- [ ] Entendo como dados fluem App → Components
- [ ] Entendo como handlers de eventos funcionam
- [ ] Entendo async/await e try/catch

---

## 🎓 Próximos Passos para Aprender

1. **Adicione um console.log** em cada handler para ver o fluxo
2. **Teste responsividade**: Abra DevTools e redimensione
3. **Modifique uma cor**: Veja como fica
4. **Adicione um emoji**: Na lista ou header
5. **Crie um novo estado**: `const [teste, setTeste] = useState()`
6. **Chame um novo endpoint**: Adicione função nova no App

---

**Dúvidas? Leia o código com os comentários deste guia ao lado! 🚀**
