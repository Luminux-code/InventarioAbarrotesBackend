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
const Caja = require('./Caja')(sequelize, Sequelize.DataTypes);
const MovimientoCaja = require('./MovimientoCaja')(sequelize, Sequelize.DataTypes);

Producto.belongsTo(Medida, { foreignKey: 'medidaId' });
Producto.belongsTo(Categoria, { foreignKey: 'categoriaId' });

Caja.hasMany(MovimientoCaja, { foreignKey: 'cajaId' });
MovimientoCaja.belongsTo(Caja, { foreignKey: 'cajaId' });


module.exports = {
  sequelize,
  User,
  Configuracion,
  Medida,
  Categoria,
  Producto,
  Caja,
  MovimientoCaja
};
