module.exports = (sequelize, DataTypes) => {
  const Compra = sequelize.define('Compra', {
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'procesada', 'cancelada'),
      allowNull: false,
      defaultValue: 'pendiente'
    }
  });

  Compra.associate = models => {
    Compra.belongsTo(models.User, { foreignKey: 'UserId' });
    Compra.hasMany(models.DetalleCompra, { foreignKey: 'compraId', as: 'detalles' });
  };

  return Compra;
};
