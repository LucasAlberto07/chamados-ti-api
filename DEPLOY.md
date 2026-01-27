# 🚀 Guia de Deploy - Chamados TI

## 📦 Opção 1: GitHub Pages + Railway (Recomendado)

### Step 1: Preparar o repositório

```bash
# Crie um repositório público no GitHub
# Exemplo: chamados-ti-api

# Clone localmente (se não estiver)
git clone https://github.com/seu-usuario/chamados-ti-api.git
cd chamados-ti-api

# Configure git
git config user.name "Seu Nome"
git config user.email "seu.email@example.com"

# Adicione todos os arquivos
git add .

# Commite
git commit -m "🚀 Chamados TI - Frontend + Backend"

# Faça push
git push origin main
```

### Step 2: Deploy do Back-end no Railway

1. Acesse [railway.app](https://railway.app)
2. Clique em "New Project"
3. Selecione "Deploy from GitHub"
4. Conecte seu repositório `chamados-ti-api`
5. Selecione o branch `main`
6. Configure as variáveis de ambiente:
   ```
   PORT=3000
   NODE_ENV=production
   ```
7. Clique em "Deploy"

Railway fornecerá uma URL como:
```
https://chamados-ti-api-production.up.railway.app
```

### Step 3: Deploy do Front-end no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Selecione "Import Git Repository"
4. Escolha `chamados-ti-api`
5. Configure o Root Directory: `frontend`
6. Adicione variáveis de ambiente:
   ```
   VITE_API_URL=https://chamados-ti-api-production.up.railway.app/api/chamados
   ```
7. Clique em "Deploy"

Vercel fornecerá uma URL como:
```
https://chamados-ti-frontend.vercel.app
```

### Step 4: Atualizar o script.js

Edite `frontend/script.js`:

```javascript
// Usar variável de ambiente ou URL padrão
const API_URL = process.env.VITE_API_URL || 'https://chamados-ti-api-production.up.railway.app/api/chamados';
```

---

## 🐳 Opção 2: Docker + Docker Compose

### Criar Dockerfile (Back-end)

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Criar docker-compose.yml

```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - NODE_ENV=production
    volumes:
      - ./database.sqlite:/app/database.sqlite

  frontend:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./frontend:/usr/share/nginx/html
    depends_on:
      - backend
```

### Deploy com Docker

```bash
# Build e inicie
docker-compose up -d

# Acesse
http://localhost
```

---

## 🟣 Opção 3: Heroku (Descontinuado, mas ainda funciona)

```bash
# Login
heroku login

# Crie um app
heroku create chamados-ti-api

# Configure variáveis
heroku config:set PORT=3000
heroku config:set NODE_ENV=production

# Faça deploy
git push heroku main

# Verifique logs
heroku logs --tail
```

---

## 📱 Opção 4: Netlify (Front-end) + Railway (Back-end)

### Deploy Front-end

1. Acesse [netlify.com](https://netlify.com)
2. Clique em "New site from Git"
3. Selecione seu repositório
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `echo "No build needed"`
   - **Publish directory**: `frontend`
5. Adicione variáveis:
   ```
   VITE_API_URL=https://seu-railway-app.up.railway.app/api/chamados
   ```
6. Deploy automático!

---

## 🔒 Checklist de Segurança

Antes de fazer deploy:

- [ ] Remova arquivos sensíveis do git
- [ ] Configure `.gitignore`:
  ```
  node_modules/
  .env
  .env.local
  database.sqlite
  dist/
  build/
  ```
- [ ] Configure CORS adequadamente
- [ ] Adicione validações de entrada
- [ ] Use HTTPS em produção
- [ ] Implemente autenticação (se necessário)
- [ ] Faça backup do banco de dados

### Configure CORS para Produção

Edite `src/app.js`:

```javascript
const cors = require('cors');

const allowedOrigins = [
  'https://seu-frontend.vercel.app',
  'https://seu-frontend.netlify.app',
  'https://seu-frontend.github.io',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
```

---

## 📊 Monitoramento

### Railway

- Dashboard automático
- Logs em tempo real
- Métricas de CPU/Memória
- Webhooks para alertas

### Vercel

- Analytics automático
- Monitoramento de performance
- Alertas de erro

### Google Analytics (Opcional)

Adicione ao `frontend/index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🆘 Troubleshooting Deploy

### "CORS policy blocked"

```javascript
// Verifique as origins
app.use(cors({
  origin: '*' // Temporário apenas para debug
}));
```

### "404 Not Found"

- Verifique se a rota está correta
- Confirme que o back-end está rodando
- Teste a URL da API no navegador

### "Cannot GET /api/chamados"

- A rota precisa ser `/api/chamados` não `/chamados`
- Verifique em `src/routes/chamado.routes.js`

### Banco de dados vazio em produção

- Railway cria um novo banco a cada deploy
- Considere usar PostgreSQL em produção
- Implemente seed de dados

---

## 📈 Performance

### Otimizações implementadas

✅ CSS minificado
✅ JavaScript vanilla (sem dependências)
✅ Lazy loading
✅ Caching no navegador

### Melhorias futuras

- [ ] Comprimir assets
- [ ] Implementar service workers
- [ ] Usar CDN para recursos estáticos
- [ ] Implementar paginação
- [ ] Adicionar busca/filtros avançados

---

## 🎉 Após o Deploy

### Compartilhe no LinkedIn

```
Descrição:
🚀 Acabei de completar meu projeto de Gerenciador de Chamados!

🎯 Tecnologias utilizadas:
- Front-end: HTML5, CSS3, JavaScript Vanilla
- Back-end: Node.js, Express.js, Sequelize
- Banco de dados: SQLite (produção: PostgreSQL)
- Deploy: Railway + Vercel

✨ Funcionalidades:
- CRUD completo
- Interface responsiva (Mobile-First)
- Consumo de API REST
- Filtros dinâmicos

Link: [cole a URL do seu deploy]
```

### Estatísticas do Projeto

```markdown
| Métrica | Valor |
|---------|-------|
| Linhas de código | ~800 |
| Endpoints | 6 |
| Funcionalidades | CRUD Completo |
| Responsividade | Mobile + Desktop |
| Tempo de desenvolvimento | ~4 horas |
| Deploy automatizado | ✅ Sim |
```

---

## 🔗 Recursos Úteis

- [Railway Documentation](https://docs.railway.app)
- [Vercel Deployment](https://vercel.com/docs)
- [Netlify Deploy](https://docs.netlify.com)
- [Docker Tutorial](https://docs.docker.com)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

**Deploy bem-sucedido! 🎊**
