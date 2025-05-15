const { DataTypes } = require('sequelize');
const conexion = require('../database');

const Pago = conexion.define('Pago', {
    id_pago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    id_solicitud: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_pago: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    monto: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    hora_pago: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    metodo_pago: {
        type: DataTypes.ENUM('efectivo','transferencia'),
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('activo','inactivo'),
        allowNull: false, 
    },
}, {
    tableName: 'pago',
    timestamps: false,
});

module.exports = Pago;