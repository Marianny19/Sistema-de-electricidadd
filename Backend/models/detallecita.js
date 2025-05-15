const { DataTypes } = require('sequelize');
const conexion = require('../database');


const DetalleCita = conexion.define('DetalleCita', {
    id_detallecita: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_cita: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cita', 
        key: 'id_cita'
      }
    },
    id_servicio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Servicio', 
        key: 'id_servicio'
      }
    }
  }, {
    tableName: 'detallecita',
    timestamps: true 
  });

module.exports = DetalleCita;
