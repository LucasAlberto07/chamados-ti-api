# 🧰 API de Chamados Internos de Suporte T.I.

Este projeto é uma **API RESTful completa** desenvolvida em **Node.js** com **Express** e **Sequelize**, utilizando **SQLite** como banco de dados, combinada com um **Frontend moderno** em **HTML5 + CSS3 + JavaScript Vanilla**.

O objetivo é gerenciar **chamados internos de suporte técnico**, permitindo o controle de tarefas como manutenção de equipamentos, solicitações de TI e acompanhamento de status.

---

## 🎯 Projeto Completo (Backend + Frontend)

### Backend ✅
- API RESTful com 6 endpoints
- CRUD completo funcionando
- CORS configurado
- SQLite com Sequelize ORM
- **Sincronização automática do banco de dados**
- **Migrations com Sequelize CLI**
- **Validação de campos ENUM**

### Frontend ✅
- HTML5 Semântico
- CSS3 Responsivo (Grid + Flexbox)
- JavaScript Vanilla (Fetch API)
- Interface moderna e intuitiva
- Totalmente funcional com a API

---

## 🚀 Funcionalidades

✅ **Criar chamado** — Adiciona um novo chamado ao sistema.  
✅ **Listar chamados** — Exibe todos os chamados cadastrados.  
✅ **Buscar por ID** — Retorna um chamado específico.  
✅ **Atualizar chamado (PUT)** — Atualiza completamente os dados de um chamado.  
✅ **Atualizar status (PATCH)** — Atualiza apenas o status do chamado.  
✅ **Deletar chamado** — Remove um chamado do banco de dados.  
✅ **Interface Web** — Frontend responsivo para gerenciar chamados visualmente.  
✅ **Filtros Dinâmicos** — Filtrar por status (Aberto, Andamento, Resolvido).  
✅ **Banco de dados automático** — Cria tabelas na primeira execução.  
✅ **Validação ENUM** — Prioridade (baixa, média, alta) e Status (aberto, em andamento, resolvido).

---

## 🧩 Tecnologias Utilizadas

- **Node.js** — Ambiente de execução JavaScript.
- **Express** — Framework para criação de servidores e rotas HTTP.
- **Sequelize** — ORM para manipulação de banco de dados relacional.
- **Sequelize CLI** — Gerenciador de migrations e seeds.
- **SQLite** — Banco de dados leve e prático para desenvolvimento local.
- **Dotenv** — Gerenciamento de variáveis de ambiente.

---

## 🔧 Configuração e Instalação

### Pré-requisitos
- Node.js v16+
- npm v7+

### 1️⃣ Instalar Dependências
```bash
npm install
```

### 2️⃣ Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:
```bash
cp .env.example .env
```

**Variáveis disponíveis:**
- `PORT` — Porta do servidor (padrão: 3000)
- `DATABASE_URL` — Caminho do banco SQLite (padrão: ./database.sqlite)
- `NODE_ENV` — Ambiente (development/production)
- `CORS_ORIGIN` — Origem permitida para CORS

### 3️⃣ Iniciar o Servidor
```bash
npm start
```

O servidor será iniciado em `http://localhost:3000` e o banco de dados será criado automaticamente.

### 4️⃣ (Opcional) Popular o Banco com Dados de Teste
Para facilitar o desenvolvimento, use os seeders com dados de demonstração:

```bash
# Executar todos os seeders
npx sequelize-cli db:seed:all

# Ou desfazer os seeders (remover dados de teste)
npx sequelize-cli db:seed:undo:all
```

**Dados incluídos no seeder:**
- 8 chamados de exemplo com diferentes prioridades e status
- Responsáveis diversificados
- Cenários reais de suporte TI

---

## 📊 Estrutura do Banco de Dados

### Tabela: `Chamados`

| Campo | Tipo | Obrigatório | Padrão |
|-------|------|-------------|--------|
| `id` | INTEGER | ✅ | Auto-increment |
| `titulo` | STRING | ✅ | — |
| `descricao` | TEXT | ❌ | NULL |
| `prioridade` | ENUM | ❌ | 'baixa' |
| `status` | ENUM | ❌ | 'aberto' |
| `responsavel` | STRING | ❌ | NULL |
| `createdAt` | TIMESTAMP | ✅ | CURRENT_TIMESTAMP |
| `updatedAt` | TIMESTAMP | ✅ | CURRENT_TIMESTAMP |

**Valores de ENUM:**
- **Prioridade:** `baixa`, `média`, `alta`
- **Status:** `aberto`, `em andamento`, `resolvido`

---

## 🌐 API REST - Endpoints

### 1. Criar Chamado
```
POST /api/chamados
Content-Type: application/json

{
  "titulo": "Impressora não funciona",
  "descricao": "A impressora da sala 101 não está imprimindo",
  "prioridade": "alta",
  "responsavel": "João Silva"
}
```

✅ Resposta (201):
```json
{
  "id": 1,
  "titulo": "Impressora não funciona",
  "descricao": "A impressora da sala 101 não está imprimindo",
  "prioridade": "alta",
  "status": "aberto",
  "responsavel": "João Silva",
  "createdAt": "2026-01-27T17:45:00.000Z",
  "updatedAt": "2026-01-27T17:45:00.000Z"
}
```

❌ Erros:
- **400:** Título obrigatório / Prioridade inválida / Status inválido
- **500:** Erro ao criar chamado

---

### 2. Listar Todos os Chamados
```
GET /api/chamados
```

✅ Resposta (200):
```json
[
  {
    "id": 1,
    "titulo": "Impressora não funciona",
    "descricao": "A impressora da sala 101 não está imprimindo",
    "prioridade": "alta",
    "status": "aberto",
    "responsavel": "João Silva",
    "createdAt": "2026-01-27T17:45:00.000Z",
    "updatedAt": "2026-01-27T17:45:00.000Z"
  }
]
```

---

### 3. Buscar Chamado por ID
```
GET /api/chamados/:id
```

✅ Resposta (200): Retorna o chamado específico
❌ Erros:
- **404:** Chamado não encontrado
- **500:** Erro ao buscar chamado

---

### 4. Atualizar Chamado (PUT)
```
PUT /api/chamados/:id
Content-Type: application/json

{
  "titulo": "Impressora da sala 101",
  "descricao": "Aguardando técnico",
  "prioridade": "média",
  "status": "em andamento",
  "responsavel": "Maria Silva"
}
```

✅ Resposta (200): Chamado atualizado
❌ Erros:
- **400:** Prioridade/Status inválido
- **404:** Chamado não encontrado
- **500:** Erro ao atualizar

---

### 5. Atualizar Status (PATCH)
```
PATCH /api/chamados/:id
Content-Type: application/json

{
  "status": "resolvido"
}
```

✅ Resposta (200): Status atualizado
❌ Erros:
- **400:** Status obrigatório / Status inválido
- **404:** Chamado não encontrado
- **500:** Erro ao atualizar

---

### 6. Deletar Chamado
```
DELETE /api/chamados/:id
```

✅ Resposta (200):
```json
{
  "message": "Chamado deletado com sucesso."
}
```

❌ Erros:
- **404:** Chamado não encontrado
- **500:** Erro ao deletar

---

## 🗂️ Estrutura do Projeto

```
chamados-ti-api/
├── server.js                    # Arquivo principal que inicia o servidor
├── .env.example                 # Template de variáveis de ambiente
├── package.json                 # Dependências e scripts do projeto
├── config/
│   └── config.json              # Configuração do Sequelize CLI
├── migrations/
│   └── 20260127174159-create-chamado-table.js  # Migration da tabela Chamados
├── models/                      # Modelos do Sequelize (auto-gerado pelo CLI)
├── seeders/                     # Seeds para popular dados (opcional)
├── src/
│   ├── app.js                   # Configuração do Express e sincronização do banco
│   ├── config/
│   │   └── database.js          # Configuração do Sequelize (SQLite, MySQL, etc.)
│   ├── models/
│   │   └── chamado.model.js     # Modelo da tabela de chamados
│   ├── controllers/
│   │   └── chamado.controller.js # Lógica da API (CRUD + validações)
│   └── routes/
│       └── chamado.routes.js    # Definição das rotas da API
└── frontend/
    ├── index.html               # Interface web
    ├── styles.css               # Estilos CSS
    ├── script.js                # Lógica JavaScript do frontend
    └── package.json             # Dependências do frontend (se houver)
```

---

## 🌱 Seeders - Dados de Teste

O projeto inclui seeders para popular o banco com dados de demonstração, facilitando testes e apresentações.

### Dados Incluídos:
- **8 chamados de exemplo** com cenários reais
- **3 níveis de prioridade**: baixa, média, alta
- **3 status diferentes**: aberto, em andamento, resolvido
- **Responsáveis variados** simulando diferentes técnicos

### Como Usar:

#### Executar todos os seeders
```bash
npx sequelize-cli db:seed:all
```

#### Desfazer seeders (limpar dados de teste)
```bash
npx sequelize-cli db:seed:undo:all
```

#### Desfazer apenas um seeder específico
```bash
npx sequelize-cli db:seed:undo --seed 20260127174632-demo-chamados.js
```

### Exemplos de Chamados Inseridos:
1. **Impressora não funciona** (Alta prioridade, Aberto)
2. **Configurar novo computador** (Média prioridade, Em andamento)
3. **Atualizar Microsoft Office** (Média prioridade, Em andamento)
4. **Trocar HD do servidor** (Alta prioridade, Resolvido)
5. **Corrigir conexão WiFi** (Baixa prioridade, Resolvido)
6. **Instalar scanner de rede** (Baixa prioridade, Aberto)
7. **Backup completo do servidor** (Alta prioridade, Em andamento)
8. **Atualizar antivírus** (Média prioridade, Aberto)

---

## 🔄 Fluxo de Sincronização do Banco

1. **Inicialização do Servidor**: Quando o servidor inicia (`npm start`), o arquivo `src/app.js` importa o Sequelize
2. **Sincronização Automática**: O `sequelize.sync()` é executado automaticamente
3. **Criação de Tabelas**: Se as tabelas não existem, elas são criadas baseado nos modelos
4. **Confirmação**: Mensagem `✅ Banco de dados sincronizado com sucesso!` aparece no console

---

## ✔️ Validações Implementadas

### Validações no Controller

1. **Título obrigatório**
   - Erro 400 se não informado
   - Aplicado em: `POST` e `PUT`

2. **Prioridade válida**
   - Valores aceitos: `baixa`, `média`, `alta`
   - Erro 400 se inválido
   - Aplicado em: `POST` e `PUT` (se informado)

3. **Status válido**
   - Valores aceitos: `aberto`, `em andamento`, `resolvido`
   - Erro 400 se inválido
   - Aplicado em: `POST`, `PUT`, e `PATCH`

4. **Status obrigatório no PATCH**
   - Erro 400 se não informado
   - Aplicado apenas em: `PATCH`

---

## 🚀 Como Usar

### Teste com cURL

```bash
# Criar chamado
curl -X POST http://localhost:3000/api/chamados \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Problema WiFi","prioridade":"alta"}'

# Listar chamados
curl http://localhost:3000/api/chamados

# Buscar por ID
curl http://localhost:3000/api/chamados/1

# Atualizar status
curl -X PATCH http://localhost:3000/api/chamados/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"em andamento"}'

# Deletar
curl -X DELETE http://localhost:3000/api/chamados/1
```

### Teste via Frontend
Abra `frontend/index.html` no navegador ou acesse através do servidor web.

---

## 📝 Notas Importantes

- ✅ O banco é criado automaticamente na primeira execução
- ✅ Não é necessário rodar migrations manualmente (`npm run migrate`)
- ✅ Validações ENUM impedem dados inválidos
- ✅ Timestamps (`createdAt`, `updatedAt`) são automáticos
- ⚠️ Para alterar a estrutura do banco, crie uma nova migration: `npx sequelize-cli migration:create --name seu-nome`

---

## 📄 Licença

MIT

---

**Desenvolvido com ❤️ para gerenciamento eficiente de chamados TI**
