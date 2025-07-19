// models/Venta.js
module.exports = (sequelize, DataTypes) => {
  const Venta = sequelize.define('Venta', {
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    metodoPago: {
      type: DataTypes.ENUM('efectivo', 'tarjeta'),
      allowNull: false
    },
    estado: {
      type: DataTypes.ENUM('completado', 'anulado'),
      allowNull: false,
      defaultValue: 'completado'
    }
  });

  Venta.associate = function(models) {
    Venta.belongsTo(models.User, { foreignKey: 'UserId' });
    Venta.hasMany(models.DetalleVenta, { foreignKey: 'ventaId', as: 'detalles' });
  };

  return Venta;
}
