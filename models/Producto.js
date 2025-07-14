// models/Producto.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Producto', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  });
};
