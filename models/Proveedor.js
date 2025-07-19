module.exports = (sequelize, DataTypes) => {
  const Proveedor = sequelize.define('Proveedor', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ruc: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    direccion: {
      type: DataTypes.STRING
    },
    telefono: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    }
  });

  Proveedor.associate = models => {
    // En el futuro puedes vincularlo con compras
  };

  return Proveedor;
};
