const {DataTypes} = require('sequelize');
const conexion = require('../database');
const { data } = require('react-router-dom');

const Registrotrabajo = conexion.define('Registrotrabajo', {
    id_registro_trabajo: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    id_solicitud_servicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_empleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_servicio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    costo_extra: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('activo','inactivo'),
        allowNull: false,
    },

}, {
    tableName: 'registro_trabajo',
    timestamps: false,
});

module.exports = Registrotrabajo;