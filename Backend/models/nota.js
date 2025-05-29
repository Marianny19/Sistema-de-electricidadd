const { DataTypes } = require('sequelize');
const conexion = require('../database');

const Nota = conexion.define('Nota', {
  id_nota: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('activo','inactivo'),
    allowNull: false,
  }
}, {
  tableName: 'nota',
  timestamps: false,
});

module.exports = Nota;
