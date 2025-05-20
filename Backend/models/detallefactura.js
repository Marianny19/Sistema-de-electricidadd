const { DataTypes } = require('sequelize');
const conexion = require('../database');

const DetalleFactura = conexion.define('DetalleFactura', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  factura_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  monto: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'),
    allowNull: false,
    defaultValue: 'activo',
  }
}, {
  tableName: 'detalle_factura',
  timestamps: false,
});

module.exports = DetalleFactura;
