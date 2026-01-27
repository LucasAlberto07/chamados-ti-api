# 🎫 Gerenciador de Chamados - Front-end

Interface moderna e responsiva para gerenciar chamados de TI. Desenvolvido com **HTML5 Semântico**, **CSS Moderno** (Flexbox/Grid) e **JavaScript Vanilla** com consumo de API REST.

## ✨ Características

- ✅ **Responsivo Mobile-First** - Funciona perfeitamente em dispositivos móveis, tablets e desktops
- ✅ **CRUD Completo** - Criar, ler, atualizar e deletar chamados
- ✅ **Filtros Dinâmicos** - Filtre por status (Aberto, Em Andamento, Resolvido)
- ✅ **Sem Dependências** - Puro HTML/CSS/JavaScript
- ✅ **UI/UX Moderno** - Design limpo e intuitivo com animações suaves
- ✅ **Notificações** - Feedback visual ao usuário

## 🚀 Como Usar

### 1. Iniciar a API (Back-end)

Certifique-se de que a API está rodando na porta 3000:

```bash
cd ../
npm install
npm start
```

A API estará disponível em: `http://localhost:3000`

### 2. Abrir o Front-end

Simplesmente abra o arquivo `index.html` no navegador:

```bash
# Opção 1: Abrir direto
open index.html

# Opção 2: Usar um servidor local (recomendado)
python -m http.server 8000
# Acesse: http://localhost:8000
```

## 📋 Funcionalidades

### 📝 Criar Chamado
- Preencha o título (obrigatório)
- Adicione descrição (opcional)
- Selecione prioridade (Baixa, Média, Alta)
- Defina responsável (opcional)
- Clique em "Criar Chamado"

### 👁️ Visualizar Chamados
- Todos os chamados aparecem em cards interativos
- Filtre por status usando os botões
- Veja contador de chamados por status

### ✏️ Editar Chamado
- Clique no botão "Editar"
- Modifique título e descrição
- As mudanças são salvas na API

### 📊 Atualizar Status
- Clique em "Status"
- Escolha o novo status
- Atualizações em tempo real

### 🗑️ Deletar Chamado
- Clique em "Deletar"
- Confirme a exclusão
- Chamado removido imediatamente

## 🎨 Estrutura

```
frontend/
├── index.html      # HTML Semântico
├── styles.css      # CSS Responsivo
├── script.js       # JavaScript com Fetch API
└── README.md       # Este arquivo
```

## 🔧 Configuração

Para alterar a URL da API, edite a variável em `script.js`:

```javascript
const API_URL = 'http://localhost:3000/api/chamados';
```

## 📱 Responsividade

- **Desktop**: Layout em grid (até 4 colunas)
- **Tablet**: Layout em grid (até 2 colunas)
- **Mobile**: Layout em coluna única

## 🌐 Cores e Design

| Cor | Uso |
|-----|-----|
| 🔵 Azul (#3b82f6) | Principal - Botões, Links |
| 🟢 Verde (#10b981) | Sucesso - Status Resolvido |
| 🟡 Amarelo (#f59e0b) | Aviso - Prioridade Média |
| 🔴 Vermelho (#ef4444) | Perigo - Deletar, Prioridade Alta |

## 🚀 Deploy

### GitHub Pages

1. Crie um repositório público no GitHub
2. Faça push da pasta `frontend/`
3. Nas configurações, ative GitHub Pages
4. **Importante**: Configure CORS na API para aceitar requisições do domínio publicado

### Vercel

1. Faça push do repositório
2. Acesse vercel.com e conecte seu repositório
3. Deploy automático

### Como Configurar CORS na API

Edite `src/app.js`:

```javascript
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8000',
  'https://seu-dominio.vercel.app',
  'https://seu-usuario.github.io'
];

app.use(cors({
  origin: allowedOrigins
}));
```

## 📚 Tecnologias Utilizadas

- **HTML5** - Semântica Web
- **CSS3** - Flexbox, Grid, Media Queries
- **JavaScript (ES6+)** - Fetch API, Async/Await
- **REST API** - Integração com back-end Node.js/Express/Sequelize

## 🎓 Conceitos Aprendidos

✅ HTML Semântico com `<header>`, `<main>`, `<section>`, `<article>`
✅ CSS Avançado com Flexbox e Grid
✅ Responsividade Mobile-First
✅ Fetch API com métodos GET, POST, PUT, PATCH, DELETE
✅ Manipulação dinâmica do DOM
✅ Tratamento de erros e feedback ao usuário
✅ Armazenamento de estado em JavaScript

## 📄 Endpoints da API Utilizados

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/chamados` | Listar todos os chamados |
| GET | `/api/chamados/:id` | Buscar chamado por ID |
| POST | `/api/chamados` | Criar novo chamado |
| PUT | `/api/chamados/:id` | Atualizar chamado |
| PATCH | `/api/chamados/:id/status` | Atualizar status |
| DELETE | `/api/chamados/:id` | Deletar chamado |

## 🐛 Troubleshooting

**Erro: "Cannot GET /api/chamados"**
- Verifique se a API está rodando em `http://localhost:3000`
- Confirme que a rota está correta no back-end

**Erro: "CORS policy blocked"**
- A API precisa de configuração CORS
- Adicione `npm install cors` no back-end
- Configure origins permitidas

**Chamados não carregam**
- Abra o DevTools (F12)
- Verifique a aba Network
- Procure por requisições falhadas à API

## 👨‍💻 Desenvolvido por

Seu Nome | 2026

---

**Deixe uma ⭐ se este projeto foi útil!**
