// models/MovimientoCaja.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('MovimientoCaja', {
    tipo: {
      type: DataTypes.ENUM('ingreso', 'egreso'),
      allowNull: false
    },
    subtipo: {
      type: DataTypes.ENUM('venta', 'compra', 'gasto_operativo', 'abono', 'otro'),
      allowNull: true
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cajaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });
};
