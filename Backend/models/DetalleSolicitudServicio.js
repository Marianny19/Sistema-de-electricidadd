const { DataTypes } = require('sequelize');
const conexion = require('../database');
const Solicitudservicio = require('./solicitudservicio');
const Servicio = require('./Servicio');

const DetalleSolicitudServicio = conexion.define('DetalleSolicitudServicio', {
  id_detalle_solicitud: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_solicitud: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Solicitudservicio,
      key: 'id_solicitud',
    }
  },
  id_servicio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Servicio,
      key: 'id_servicio',
    }
  }
}, {
  tableName: 'detallesolicitud',
  timestamps: false,
});
module.exports = DetalleSolicitudServicio;