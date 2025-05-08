const { DataTypes } = require('sequelize');
const conexion = require('../database');

const Pago = conexion.define('Pago', {
  id_pago: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_cotizacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
  },
  fecha_pago: {
    type: DataTypes.DATE, 
    allowNull: false,
  },
  metodo_pago: {
    type: DataTypes.ENUM('efectivo', 'tarjeta', 'transferencia'),
    allowNull: false,
  },
}, {
  tableName: 'pago',     
  timestamps: false,
});

module.exports = Pago;
