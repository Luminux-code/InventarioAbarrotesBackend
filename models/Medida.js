// models/Medida.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Medida', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nombre_corto: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
};
