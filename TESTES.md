# 🧪 Guia de Testes - Chamados TI

## ⚡ Quick Test (5 minutos)

### 1. Iniciar Back-end

```bash
npm start
```

Saída esperada:
```
🚀 Servidor rodando na porta 3000
```

### 2. Iniciar Front-end (novo terminal)

```bash
cd frontend
python -m http.server 8000
```

Saída esperada:
```
Serving HTTP on 0.0.0.0 port 8000
```

### 3. Abrir no navegador

```
http://localhost:8000
```

Você deve ver:
- ✅ Header com "Gerenciador de Chamados"
- ✅ Formulário para criar chamado
- ✅ Seção de filtros
- ✅ Lista de chamados (vazia no início)

---

## 🔍 Testes via Terminal

### GET: Listar Chamados

```bash
curl http://localhost:3000/api/chamados
```

Saída esperada:
```json
[]
```

ou

```json
[
  {
    "id": 1,
    "titulo": "Internet não funciona",
    "descricao": "Sala 101",
    "prioridade": "alta",
    "status": "aberto",
    "responsavel": "João",
    "createdAt": "2026-01-26T10:30:00.000Z",
    "updatedAt": "2026-01-26T10:30:00.000Z"
  }
]
```

### POST: Criar Chamado

```bash
curl -X POST http://localhost:3000/api/chamados \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Internet não funciona",
    "descricao": "A internet da sala 101 caiu",
    "prioridade": "alta",
    "responsavel": "João Silva"
  }'
```

Saída esperada:
```json
{
  "id": 1,
  "titulo": "Internet não funciona",
  "descricao": "A internet da sala 101 caiu",
  "prioridade": "alta",
  "status": "aberto",
  "responsavel": "João Silva",
  "createdAt": "2026-01-26T10:30:00.000Z",
  "updatedAt": "2026-01-26T10:30:00.000Z"
}
```

### GET: Buscar por ID

```bash
curl http://localhost:3000/api/chamados/1
```

### PATCH: Atualizar Status

```bash
curl -X PATCH http://localhost:3000/api/chamados/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "em andamento"}'
```

### PUT: Atualizar Completo

```bash
curl -X PUT http://localhost:3000/api/chamados/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Internet (RESOLVIDO)",
    "descricao": "Teste",
    "prioridade": "média",
    "status": "resolvido",
    "responsavel": "Maria"
  }'
```

### DELETE: Deletar Chamado

```bash
curl -X DELETE http://localhost:3000/api/chamados/1
```

---

## 🖱️ Testes via Interface Web

### Teste 1: Criar Chamado

1. Preencha o formulário:
   - **Título**: "Teste Interface"
   - **Descrição**: "Criando via interface"
   - **Prioridade**: "média"
   - **Responsável**: "Você"
2. Clique em "✨ Criar Chamado"
3. ✅ Verifique se aparece na lista

### Teste 2: Filtros

1. Crie 3 chamados com status diferentes
2. Clique no botão "Em Andamento"
3. ✅ Verifique se mostra apenas os do status selecionado

### Teste 3: Editar Chamado

1. Clique em "✏️ Editar" em um chamado
2. Modifique o título
3. ✅ Verifique se aparece na lista com nova informação

### Teste 4: Atualizar Status

1. Clique em "✓ Status"
2. Selecione um novo status
3. ✅ Verifique se o badge atualiza

### Teste 5: Deletar Chamado

1. Clique em "🗑️ Deletar"
2. Confirme a exclusão
3. ✅ Verifique se desaparece da lista

### Teste 6: Responsividade

1. Abra DevTools (F12)
2. Ative "Modo Responsivo" (Ctrl+Shift+M)
3. Teste em:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1200px)

✅ Verifique se layout se adapta corretamente

---

## 🐛 Checklist de Bugs

### Layout

- [ ] Formulário se alinha corretamente em mobile
- [ ] Cards não quebram em mobile
- [ ] Botões são clicáveis em touch
- [ ] Sem scroll horizontal em mobile

### Funcionalidades

- [ ] Pode criar chamado com título
- [ ] Não pode criar sem título
- [ ] Filtros funcionam corretamente
- [ ] Contador de status atualiza
- [ ] Pode editar chamado
- [ ] Pode atualizar status
- [ ] Pode deletar com confirmação

### API

- [ ] GET retorna array de chamados
- [ ] POST cria novo e retorna com ID
- [ ] PATCH atualiza status
- [ ] PUT atualiza completo
- [ ] DELETE remove do banco

### UX/UI

- [ ] Notificações aparecem após ações
- [ ] Notificações desaparecem após 3s
- [ ] Botões têm hover effect
- [ ] Cards têm shadow ao hover
- [ ] Cores estão consistentes

---

## 🔐 Testes de Segurança

### XSS (Cross-Site Scripting)

```bash
# Tente criar um chamado com:
Título: <script>alert('XSS')</script>

# ✅ O script NÃO deve executar (está escapado em script.js)
```

### SQL Injection

```bash
# Tente:
curl -X POST http://localhost:3000/api/chamados \
  -H "Content-Type: application/json" \
  -d '{"titulo": "x' OR '1'='1"}'

# ✅ Deve ser tratado como string normal (Sequelize protege)
```

### CORS

```bash
# De um site diferente, teste:
fetch('http://localhost:3000/api/chamados')

# ✅ Deve funcionar (CORS habilitado)
```

---

## 📊 Testes de Performance

### Carga de 100 Chamados

```bash
# Crie 100 chamados
for i in {1..100}; do
  curl -X POST http://localhost:3000/api/chamados \
    -H "Content-Type: application/json" \
    -d "{\"titulo\": \"Chamado $i\", \"prioridade\": \"baixa\"}"
done

# ✅ Verifique se carrega sem problemas
```

### Load Time

```bash
# Abra DevTools (F12) → Network → Recarregue
# ✅ Verifique tempos:
# - HTML: < 100ms
# - CSS: < 50ms
# - JS: < 100ms
# - API call: < 500ms
```

---

## 🎯 Plano de Testes Completo

| Teste | Status | Notas |
|-------|--------|-------|
| Criar chamado | ✅ | Verificar validação |
| Listar chamados | ✅ | Verificar array vazio |
| Editar chamado | ✅ | Verificar update |
| Atualizar status | ✅ | Verificar PATCH |
| Deletar chamado | ✅ | Verificar confirmação |
| Filtrar por status | ✅ | Verificar filtragem |
| Mobile layout | ✅ | Verificar responsividade |
| CORS | ✅ | Verificar acesso |
| XSS protection | ✅ | Verificar escape HTML |
| Performance | ✅ | Verificar load times |

---

## 🔧 Debugging

### DevTools

1. **F12** - Abrir DevTools
2. **Console** - Verifique erros de JavaScript
3. **Network** - Verifique requisições de API
4. **Elements** - Inspecione HTML/CSS
5. **Application** - Verifique LocalStorage/Cookies

### Erros Comuns

**"Cannot GET /api/chamados"**
- Verifique se back-end está rodando
- Confirme a porta (3000)
- Teste: `curl http://localhost:3000/api/chamados`

**"CORS policy blocked"**
- Instale cors: `npm install cors`
- Adicione em `src/app.js`: `app.use(cors())`
- Reinicie o servidor

**"Chamados não carregam"**
- Abra Console (F12)
- Procure por erros em vermelho
- Verifique a aba Network

---

## ✅ Ready for Production!

Quando todos os testes passarem:

- [ ] Build otimizado
- [ ] Deploy documentado
- [ ] Testes automatizados (opcional)
- [ ] Monitoring configurado
- [ ] Backup de dados
- [ ] Documentação atualizada

---

**Boa sorte nos testes! 🧪**
