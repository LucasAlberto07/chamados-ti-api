const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Chamado = sequelize.define('Chamado', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
  },
  prioridade: {
    type: DataTypes.ENUM('baixa', 'média', 'alta'),
    allowNull: false,
    defaultValue: 'baixa',
  },
  status: {
    type: DataTypes.ENUM('aberto', 'em andamento', 'resolvido'),
    allowNull: false,
    defaultValue: 'aberto',
  },
  responsavel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Chamado;
