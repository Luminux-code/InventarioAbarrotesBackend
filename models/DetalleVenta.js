module.exports = (sequelize, DataTypes) => {
  const DetalleVenta = sequelize.define('DetalleVenta', {
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precioUnitario: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  DetalleVenta.associate = function(models) {
    DetalleVenta.belongsTo(models.Venta, { foreignKey: 'ventaId' });
    DetalleVenta.belongsTo(models.Producto, { foreignKey: 'productoId' });
  };

  return DetalleVenta;
};
