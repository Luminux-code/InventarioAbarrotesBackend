module.exports = (sequelize, DataTypes) => {
  const DetalleCompra = sequelize.define('DetalleCompra', {
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precioUnitario: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  DetalleCompra.associate = models => {
    DetalleCompra.belongsTo(models.Compra, { foreignKey: 'compraId' });
    DetalleCompra.belongsTo(models.Producto, { foreignKey: 'productoId' });
  };

  return DetalleCompra;
};
