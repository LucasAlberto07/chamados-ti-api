const express = require('express');
const cors = require('cors');
const app = express();
const chamadoRoutes = require('./routes/chamado.routes');
const sequelize = require('./config/database');

app.use(cors({
  origin: process.env.FRONTEND,
  credentials: true
}));
app.use(express.json());

// Rota raiz - informações da API
app.get('/', (req, res) => {
  res.json({
    status: '✅ API em funcionamento',
    nome: 'API de Chamados TI',
    versao: '1.0.0',
    endpoints: {
      criar: 'POST /api/chamados',
      listar: 'GET /api/chamados',
      buscarPorId: 'GET /api/chamados/:id',
      atualizar: 'PUT /api/chamados/:id',
      atualizarStatus: 'PATCH /api/chamados/:id',
      deletar: 'DELETE /api/chamados/:id'
    },
    documentacao: 'https://github.com/LucasAlberto07/chamados-ti-api'
  });
});

app.use('/api/chamados', chamadoRoutes);

// Sincronizar banco de dados automaticamente
sequelize.sync({ alter: false }).then(() => {
  console.log('✅ Banco de dados sincronizado com sucesso!');
}).catch(error => {
  console.error('❌ Erro ao sincronizar banco de dados:', error);
  process.exit(1);
});

module.exports = app;
