// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const UserModel = require('./User');
const ConfiguracionModel = require('./Configuracion');

const User = UserModel(sequelize, Sequelize.DataTypes);
const Configuracion = ConfiguracionModel(sequelize, Sequelize.DataTypes);
const Medida = require('./Medida')(sequelize, Sequelize.DataTypes);
const Categoria = require('./Categoria')(sequelize, Sequelize.DataTypes);
const Producto = require('./Producto')(sequelize, Sequelize.DataTypes);

Producto.belongsTo(Medida, { foreignKey: 'medidaId' });
Producto.belongsTo(Categoria, { foreignKey: 'categoriaId' });

module.exports = {
  sequelize,
  User,
  Configuracion,
  Medida,
  Categoria,
  Producto
};
