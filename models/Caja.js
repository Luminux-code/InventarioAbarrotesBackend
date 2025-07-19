module.exports = (sequelize, DataTypes) => {
  const Caja = sequelize.define('Caja', {
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

  Caja.associate = function(models) {
    Caja.belongsTo(models.User, {
      foreignKey: 'usuarioAperturaId',
      as: 'usuarioApertura'
    });
    Caja.belongsTo(models.User, {
      foreignKey: 'usuarioCierreId',
      as: 'usuarioCierre'
    });
    Caja.hasMany(models.MovimientoCaja, {
      foreignKey: 'cajaId',
      as: 'movimientos'
    });
  };

  return Caja;
};
