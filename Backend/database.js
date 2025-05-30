require('dotenv').config();
const { Sequelize } = require('sequelize');

const conexion = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

conexion.authenticate()
  .then(() => console.log('✅ Conectado a la base de datos'))
  .catch((error) => console.error('❌ Error al conectar a la base de datos:', error));

module.exports = conexion;