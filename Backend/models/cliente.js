const { DataTypes } = require('sequelize');
const conexion = require('../database');

const Cliente = conexion.define('Cliente', {
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cedula: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    allowNull: false,
  },
}, {
  tableName: 'cliente',
  timestamps: false,
});

module.exports = Cliente;
