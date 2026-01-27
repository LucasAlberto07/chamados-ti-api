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
app.use('/api/chamados', chamadoRoutes);

// Sincronizar banco de dados automaticamente
sequelize.sync({ alter: false }).then(() => {
  console.log('✅ Banco de dados sincronizado com sucesso!');
}).catch(error => {
  console.error('❌ Erro ao sincronizar banco de dados:', error);
  process.exit(1);
});

module.exports = app;
