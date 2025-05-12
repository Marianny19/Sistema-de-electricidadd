const { DataTypes } = require('sequelize');
const conexion = require('../database');

const Servicio = conexion.define('Servicio', {
    id_servicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre_servicio: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    duracion_estimada: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unidad_duracion: {
        type: DataTypes.ENUM('minutos','horas','dias'),
        allowNull: false,
    },
    costo_base: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('activo','inactivo'),
        allowNull: false, 
    },
}, {
    tableName: 'servicio',
    timestamps: false,
});

module.exports = Servicio;
