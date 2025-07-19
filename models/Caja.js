// models/Caja.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Caja', {
    montoInicial: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    montoFinal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    estado: {
      type: DataTypes.ENUM('abierta', 'cerrada'),
      allowNull: false,
      defaultValue: 'abierta'
    },
    totalVentas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usuarioAperturaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usuarioCierreId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fechaApertura: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    fechaCierre: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });
};
