// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const UserModel = require('./User');
const ConfiguracionModel = require('./Configuracion');

const User = UserModel(sequelize, Sequelize.DataTypes);
const Configuracion = ConfiguracionModel(sequelize, Sequelize.DataTypes);

module.exports = {
  sequelize,
  User,
  Configuracion
};
