const { DataTypes } = require('sequelize');
const conexion = require('../database');
const Registrotrabajo = require('./registrotrabajo');
const Servicio = require('./Servicio');

const Detalleregistrotrabajo = conexion.define('Detalleregistrotrabajo', {
    id_registro_trabajo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Registrotrabajo,
      key: 'id_registro_trabajo',
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
  tableName: 'detalleregistro',
  timestamps: false,
});
module.exports = Detalleregistrotrabajo;