# 🧰 API de Chamados Internos de Suporte T.I.

Este projeto é uma **API RESTful** desenvolvida em **Node.js** com **Express** e **Sequelize**, utilizando **SQLite** como banco de dados.  
O objetivo é gerenciar **chamados internos de suporte técnico**, permitindo o controle de tarefas como manutenção de equipamentos, solicitações de TI e acompanhamento de status.

---

## 🚀 Funcionalidades

✅ **Criar chamado** — Adiciona um novo chamado ao sistema.  
✅ **Listar chamados** — Exibe todos os chamados cadastrados.  
✅ **Buscar por ID** — Retorna um chamado específico.  
✅ **Atualizar chamado (PUT)** — Atualiza completamente os dados de um chamado.  
✅ **Atualizar status (PATCH)** — Atualiza apenas o status do chamado.  
✅ **Deletar chamado** — Remove um chamado do banco de dados.

---

## 🧩 Tecnologias Utilizadas

- **Node.js** — Ambiente de execução JavaScript.
- **Express** — Framework para criação de servidores e rotas HTTP.
- **Sequelize** — ORM para manipulação de banco de dados relacional.
- **SQLite** — Banco de dados leve e prático para desenvolvimento local.
- **Dotenv** — Gerenciamento de variáveis de ambiente.

---

## 🗂️ Estrutura do Projeto

🗂️ Estrutura do Projeto
<pre> chamados-api/ ├── server.js # Arquivo principal que inicia o servidor ├── .env # Variáveis de ambiente (porta, banco de dados, etc.) ├── package.json # Dependências e scripts do projeto └── src/ ├── app.js # Configuração do Express e middlewares ├── config/ │ └── database.js # Configuração do Sequelize (SQLite, MySQL, etc.) ├── models/ │ └── chamadoModel.js # Modelo da tabela de chamados ├── controllers/ │ └── chamadoController.js # Lógica de criação, listagem, atualização e exclusão de chamados ├── routes/ │ └── chamadoRoutes.js # Definição das rotas da API └── database/ └── sync.js # Sincronização do banco de dados com os modelos </pre>
