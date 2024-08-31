module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define('cliente', { 
      id_cliente: {
        type: Sequelize.NUMERIC,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING(100)
      },
      apellido: {
        type: Sequelize.STRING(100)
      },
      razon_social: {
        type: Sequelize.STRING(100)
      },
      nit: {
        type: Sequelize.STRING(10)
      },
      direccion: {
        type: Sequelize.STRING(100)
      },
      telefono: {
        type: Sequelize.STRING(100)
      },
      email: {
        type: Sequelize.STRING(50)
      },
      fecha_ingreso: {
        type: Sequelize.DATE
      },
      estatus: {
        type: Sequelize.NUMERIC
      }
    });
  
    return Cliente;
  };
  