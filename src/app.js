const express = require('express');
const cors = require('cors');
const app = express();
const chamadoRoutes = require('./routes/chamado.routes');

app.use(cors());
app.use(express.json());
app.use('/api/chamados', chamadoRoutes);

module.exports = app;
