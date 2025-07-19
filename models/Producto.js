// models/Producto.js
module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
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

  Producto.associate = function(models) {
    Producto.belongsTo(models.Medida, { foreignKey: 'medidaId' });
    Producto.belongsTo(models.Categoria, { foreignKey: 'categoriaId' });
    Producto.hasMany(models.DetalleVenta, { foreignKey: 'productoId' });
  };

  return Producto;
};
