const { DataTypes } = require('sequelize');
const conexion = require('../database');
const DetalleCotizacion = require('./DetalleCotizacion');



const Cotizacion = conexion.define('Cotizacion', {
     id_cotizacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha_emision: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    impuestos: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    descuento: {
      type: DataTypes.ENUM('1%', '10%', '15%', '20%', '25%', '30%'),
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'aceptada', 'rechazada', 'inactiva'),
      allowNull: true,
      defaultValue: 'pendiente'
    }
  }, {
    tableName: 'cotizacion',
    timestamps: false
  });
  
  Cotizacion.associate = (models) => {
  Cotizacion.belongsTo(models.Cliente, {
    foreignKey: 'id_cliente',
    as: 'cliente'
  });
};



 module.exports = Cotizacion;