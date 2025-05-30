require('dotenv').config();
const { Sequelize } = require('sequelize');

// Validar variables de entorno necesarias
const requiredEnv = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT', 'DB_DIALECT'];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Falta la variable de entorno: ${key}`);
    process.exit(1);
  }
});

const conexion = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false, // Opcional: desactiva logs SQL en consola
  }
);

conexion.authenticate()
  .then(() => console.log('Conectado a la base de datos'))
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1);
  });

module.exports = conexion;
