// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Lista de modelos
const modelDefiners = [
  require('./User'),
  require('./Configuracion'),
  require('./Medida'),
  require('./Categoria'),
  require('./Producto'),
  require('./Caja'),
  require('./MovimientoCaja'),
  require('./Venta'),
  require('./DetalleVenta'),
  require('./Compra'),
  require('./DetalleCompra'),
];

// Inicializar todos los modelos
const db = {};

for (const defineModel of modelDefiners) {
  const model = defineModel(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

// Ejecutar asociaciones si existen
Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
