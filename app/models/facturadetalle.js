module.exports = (sequelize, Sequelize) => {
    const FacturaDetalle = sequelize.define('factura_detalle', {
      id_factura: {
        type: Sequelize.NUMERIC,
        primaryKey: true
      },
      id_linea: {
        type: Sequelize.NUMERIC,
        primaryKey: true
      },
      id_producto: {
        type: Sequelize.NUMERIC
      },
      cantidad: {
        type: Sequelize.NUMERIC
      }
    });
  
    return FacturaDetalle;
  };
  