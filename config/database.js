require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,     // nombre de la base de datos
  process.env.DB_USER,     // usuario
  process.env.DB_PASSWORD, // contraseña
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // si quieres ver las consultas en consola, pon true
  }
);

// Probar conexión
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado a la base de datos MySQL con Sequelize');
  })
  .catch((err) => {
    console.error('❌ Error al conectar con Sequelize:', err);
  });

module.exports = sequelize;
