# 🚀 Guia de Setup Completo - Chamados TI API + Frontend

## 📋 Pré-requisitos

- Node.js (v14+)
- npm ou yarn
- Python (para servidor local do frontend)
- Um navegador moderno

## 🔧 Setup do Back-end (API)

### 1. Instalar dependências

```bash
cd chamados-ti-api
npm install
```

### 2. Instalar CORS (se ainda não instalado)

```bash
npm install cors
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```
PORT=3000
NODE_ENV=development
DB_PATH=./database.sqlite
```

### 4. Iniciar o servidor

```bash
npm start
```

Você verá:
```
🚀 Servidor rodando na porta 3000
```

**Teste a API:**
```bash
curl http://localhost:3000/api/chamados
```

---

## 🎨 Setup do Front-end

### 1. Navegar até a pasta frontend

```bash
cd frontend
```

### 2. Opção A: Abrir direto no navegador

Simplesmente abra `index.html` no navegador:
- `Ctrl+O` (Windows/Linux) ou `Cmd+O` (Mac)
- Selecione `index.html`

### Opção B: Usar servidor Python (Recomendado)

```bash
# Python 3.x
python -m http.server 8000

# Ou Python 2.x
python -m SimpleHTTPServer 8000
```

Acesse: `http://localhost:8000`

---

## ✅ Verificar Conexão

1. Abra o Front-end
2. Você deve ver "Carregando chamados..."
3. Depois de 1-2 segundos, a lista aparecerá vazia (ou com dados existentes)
4. Teste criando um novo chamado

Se receber erro de CORS:
- Verifique se `cors` está instalado no back-end
- Confirme que o middleware está no `app.js`
- Reinicie o servidor

---

## 📊 Estrutura de Pastas

```
chamados-ti-api/
├── server.js              # Entrada da API
├── package.json           # Dependências (Node.js)
├── .env                   # Variáveis de ambiente
├── database.sqlite        # Banco de dados (criado automaticamente)
│
├── src/
│   ├── app.js             # Configuração Express
│   ├── config/
│   │   ├── database.js    # Conexão Sequelize
│   │   └── sync.js        # Sincronização BD
│   ├── models/
│   │   └── chamado.model.js
│   ├── controllers/
│   │   └── chamado.controller.js
│   └── routes/
│       └── chamado.routes.js
│
└── frontend/              # 👈 Novo Front-end
    ├── index.html         # HTML Semântico
    ├── styles.css         # CSS Responsivo
    ├── script.js          # JavaScript + Fetch API
    ├── package.json       # Documentação (opcional)
    └── README.md          # Documentação frontend
```

---

## 🎯 Fluxo de Requisições

```
Frontend (http://localhost:8000)
    ↓
    Fetch API
    ↓
Back-end (http://localhost:3000)
    ↓
    Express + CORS
    ↓
    Sequelize ORM
    ↓
SQLite Database
```

---

## 🧪 Testes Manuais da API

### Criar Chamado (POST)

```bash
curl -X POST http://localhost:3000/api/chamados \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Internet não funciona",
    "descricao": "Sala 101 sem conexão",
    "prioridade": "alta",
    "responsavel": "João"
  }'
```

### Listar Chamados (GET)

```bash
curl http://localhost:3000/api/chamados
```

### Atualizar Status (PATCH)

```bash
curl -X PATCH http://localhost:3000/api/chamados/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "em andamento"}'
```

### Deletar Chamado (DELETE)

```bash
curl -X DELETE http://localhost:3000/api/chamados/1
```

---

## 🚀 Deploy

### GitHub Pages + Vercel (Recomendado)

1. **Back-end no Heroku/Railway/Render**
   - Faça deploy da API em um servidor
   - Copie a URL: `https://seu-api.railway.app`

2. **Front-end no Vercel**
   - Faça push do repositório
   - Conecte no Vercel
   - Configure a variável de ambiente:
     ```
     VITE_API_URL=https://seu-api.railway.app/api/chamados
     ```

3. **Atualize o script.js**
   ```javascript
   const API_URL = process.env.VITE_API_URL || 'http://localhost:3000/api/chamados';
   ```

---

## 📝 Checklist de Configuração

- [ ] Node.js instalado (`node -v`)
- [ ] npm instalado (`npm -v`)
- [ ] Dependências do back-end instaladas
- [ ] `cors` instalado no back-end
- [ ] CORS configurado em `app.js`
- [ ] Back-end rodando em `http://localhost:3000`
- [ ] Front-end acessível em `http://localhost:8000`
- [ ] Pode criar um chamado via interface
- [ ] Pode listar chamados da API
- [ ] Pode atualizar status
- [ ] Pode deletar chamado

---

## 🆘 Troubleshooting

### "Cannot GET /api/chamados"
- Verifique se a rota está correta
- Confirme se o back-end está rodando
- Teste: `curl http://localhost:3000/api/chamados`

### "CORS policy blocked"
```bash
npm install cors
# Atualize app.js
```

### "Chamados não carregam"
- Abra DevTools (F12)
- Vá para a aba Network
- Procure pela requisição a `/api/chamados`
- Verifique o status (200, 404, 500, etc)

### Banco de dados não criado
```bash
# No back-end, execute:
node -e "require('./src/config/sync.js')"
```

### Porta 3000 já está em uso
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

---

## 📚 Recursos Úteis

- [MDN - Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)
- [Express.js](https://expressjs.com/)
- [Sequelize ORM](https://sequelize.org/)
- [CSS Grid](https://developer.mozilla.org/pt-BR/docs/Web/CSS/grid)
- [Flexbox](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Flexible_Box_Layout)

---

## ✨ Pronto!

Agora você tem um sistema completo de gerenciamento de chamados com:
- ✅ API REST funcional
- ✅ Interface moderna e responsiva
- ✅ CRUD completo
- ✅ Pronto para produção

Bom desenvolvimento! 🚀
