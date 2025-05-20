const { Sequelize } = require('sequelize');

const conexion = new Sequelize('sistema_electricidad', 'root', 'Marianny19', {
  host: 'localhost',
  dialect: 'mysql',
});

conexion.authenticate()
  .then(() => console.log('Conectado a la base de datos'))
  .catch((error) => console.error('Error al conectar:', error));

module.exports = conexion;
