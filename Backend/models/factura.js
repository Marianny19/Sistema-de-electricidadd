const { DataTypes } = require('sequelize');
const conexion = require('../database');

const Factura = conexion.define('Factura', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  solicitud_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_emision: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  monto_pendiente: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  monto_pagado: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('activo','inactivo'),
    allowNull: false,
  },
}, {
  tableName: 'factura',
  timestamps: false,
});

module.exports = Factura;
