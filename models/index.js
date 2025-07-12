// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const UserModel = require('./User');
const User = UserModel(sequelize, Sequelize.DataTypes);

module.exports = {
  sequelize,
  User
};
