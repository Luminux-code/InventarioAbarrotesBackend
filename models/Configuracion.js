// models/Configuracion.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Configuracion', {
    nombreEmpresa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ruc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logoUrl: {
      type: DataTypes.STRING, 
      allowNull: true,
    }
  });
};
