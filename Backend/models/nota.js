const { DataTypes } = require('sequelize');
const conexion = require('../database');

const Nota = conexion.define('Nota', {
  id_nota: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_cita: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'nota',
  timestamps: false,
});

module.exports = Nota;
