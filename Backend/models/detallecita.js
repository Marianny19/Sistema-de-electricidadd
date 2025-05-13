// models/DetalleCita.js
module.exports = (sequelize, DataTypes) => {
  const DetalleCita = sequelize.define('DetalleCita', {
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
    timestamps: true // Ahora Sequelize manejará automáticamente createdAt y updatedAt
  });

  return DetalleCita;
};
