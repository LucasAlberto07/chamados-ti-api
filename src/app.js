const express = require('express');
const app = express();
const chamadoRoutes = require('./routes/chamado.routes');

app.use(express.json());
app.use('/chamados', chamadoRoutes);

module.exports = app;
