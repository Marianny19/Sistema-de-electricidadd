const { DataTypes } = require('sequelize');
const conexion = require('../database');
const Cotizacion = require('./Cotizacion');
const Servicio = require('./Servicio');


  const DetalleCotizacion = conexion.define('DetalleCotizacion', {
    id_detalle: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_cotizacion: DataTypes.INTEGER,
    id_servicio: DataTypes.INTEGER,
    costo_base: DataTypes.DECIMAL(10,2)
  }, {
    tableName: 'detalle_cotizacion',
    timestamps: false
  });




module.exports = DetalleCotizacion;