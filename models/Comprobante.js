// models/Comprobante.js
module.exports = (sequelize, DataTypes) => {
  const Comprobante = sequelize.define('Comprobante', {
    tipo: {
      type: DataTypes.ENUM('boleta', 'factura'),
      allowNull: false
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    ventaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Comprobante.associate = (models) => {
    Comprobante.belongsTo(models.Venta, { foreignKey: 'ventaId' });
  };

  return Comprobante;
};
