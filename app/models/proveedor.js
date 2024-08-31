module.exports = (sequelize, Sequelize) => {
    const Proveedor = sequelize.define('proveedor', {
      id_proveedor: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      empresa: {
        type: Sequelize.STRING(100)
      },
      direccion: {
        type: Sequelize.STRING(100)
      },
      telefono: {
        type: Sequelize.INTEGER
      },
      nit: {
        type: Sequelize.STRING(30)
      },
      ciudad: {
        type: Sequelize.STRING(100)
      },
      pais: {
        type: Sequelize.STRING(100)
      },
      contacto: {
        type: Sequelize.STRING(100)
      },
      email: {
        type: Sequelize.STRING(100)
      },
      telefono_contacto: {
        type: Sequelize.INTEGER
      },
      estatus: {
        type: Sequelize.INTEGER
      }
    }, {
      timestamps: true
    });
  
    return Proveedor;
  };
  