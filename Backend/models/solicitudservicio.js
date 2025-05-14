const { DataTypes } = require('sequelize');
const conexion = require('../database');

const Solicitudservicio = conexion.define('Solicitudservicio', {
  id_solicitud: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  via_comunicacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('Pendiente', 'Realizado', 'Atrasado', 'Cancelado'),
    allowNull: false,
  },
}, {
  tableName: 'solicitud_servicio',
  timestamps: false,
});

module.exports = Solicitudservicio;