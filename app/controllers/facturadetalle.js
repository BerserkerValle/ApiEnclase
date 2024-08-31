const db = require('../config/db.config.js');
const FacturaDetalle = db.FacturaDetalle;

exports.create = (req, res) => {
  let facturaDetalle = {};

  try {
    facturaDetalle.id_factura = req.body.id_factura;
    facturaDetalle.id_linea = req.body.id_linea;
    facturaDetalle.id_producto = req.body.id_producto;
    facturaDetalle.cantidad = req.body.cantidad;

    FacturaDetalle.create(facturaDetalle).then(result => {
      res.status(200).json({
        message: "Upload Successfully a FacturaDetalle with ID Factura = " + result.id_factura + " and ID Linea = " + result.id_linea,
        facturaDetalle: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message
    });
  }
}

exports.retrieveAllFacturaDetalles = (req, res) => {
  FacturaDetalle.findAll()
    .then(facturaDetalleInfos => {
      res.status(200).json({
        message: "Get all FacturaDetalles' Infos Successfully!",
        facturaDetalles: facturaDetalleInfos
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error!",
        error: error
      });
    });
}

exports.getFacturaDetalleById = (req, res) => {
  let idFactura = req.params.id_factura;
  let idLinea = req.params.id_linea;
  FacturaDetalle.findOne({
    where: {
      id_factura: idFactura,
      id_linea: idLinea
    }
  })
    .then(facturaDetalle => {
      res.status(200).json({
        message: "Successfully Get a FacturaDetalle with ID Factura = " + idFactura + " and ID Linea = " + idLinea,
        facturaDetalle: facturaDetalle
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error!",
        error: error
      });
    });
}

exports.updateById = async (req, res) => {
  try {
    let idFactura = req.params.id_factura;
    let idLinea = req.params.id_linea;
    let facturaDetalle = await FacturaDetalle.findOne({
      where: {
        id_factura: idFactura,
        id_linea: idLinea
      }
    });

    if (!facturaDetalle) {
      res.status(404).json({
        message: "Not Found for updating a FacturaDetalle with ID Factura = " + idFactura + " and ID Linea = " + idLinea,
        facturaDetalle: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        id_producto: req.body.id_producto,
        cantidad: req.body.cantidad
      };
      let result = await FacturaDetalle.update(updatedObject, {
        where: {
          id_factura: idFactura,
          id_linea: idLinea
        }
      });

      if (!result) {
        res.status(500).json({
          message: "Error -> Can not update a FacturaDetalle with ID Factura = " + idFactura + " and ID Linea = " + idLinea,
          error: "Can NOT Updated",
        });
      }

      res.status(200).json({
        message: "Update successfully a FacturaDetalle with ID Factura = " + idFactura + " and ID Linea = " + idLinea,
        facturaDetalle: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> Can not update a FacturaDetalle with ID Factura = " + req.params.id_factura + " and ID Linea = " + req.params.id_linea,
      error: error.message
    });
  }
}

exports.deleteById = async (req, res) => {
  try {
    let idFactura = req.params.id_factura;
    let idLinea = req.params.id_linea;
    let facturaDetalle = await FacturaDetalle.findOne({
      where: {
        id_factura: idFactura,
        id_linea: idLinea
      }
    });

    if (!facturaDetalle) {
      res.status(404).json({
        message: "Does Not exist a FacturaDetalle with ID Factura = " + idFactura + " and ID Linea = " + idLinea,
        error: "404",
      });
    } else {
      await facturaDetalle.destroy();
      res.status(200).json({
        message: "Delete Successfully a FacturaDetalle with ID Factura = " + idFactura + " and ID Linea = " + idLinea,
        facturaDetalle: facturaDetalle,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> Can NOT delete a FacturaDetalle with ID Factura = " + req.params.id_factura + " and ID Linea = " + req.params.id_linea,
      error: error.message,
    });
  }
}
