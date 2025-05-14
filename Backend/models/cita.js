const { DataTypes } = require('sequelize');
const conexion = require('../database');

const Cita = conexion.define('Cita', {
  id_cita: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_empleado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('agendada', 'completada', 'cancelada'),
    allowNull: false,
  },
}, {
  tableName: 'cita',
  timestamps: false,
});

module.exports = Cita;
