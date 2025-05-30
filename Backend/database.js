const { Sequelize } = require('sequelize');

const conexion = new Sequelize('railway', 'root', 'HDpNWUpKeFlKCtyETPUfsdYYcpTVdIBZ', {
  host: 'nozomi.proxy.rlwy.net',
  port: 40129,
  dialect: 'mysql',
});

conexion.authenticate()
  .then(() => console.log('Conectado a la base de datos'))
  .catch((error) => console.error('Error al conectar:', error));

module.exports = conexion;