// models/User.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[0-9]+$/  // solo dígitos
      }
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rol: {
      type: DataTypes.ENUM('gerente', 'cajero', 'almacen'),
      allowNull: false,
    }
  });
};
