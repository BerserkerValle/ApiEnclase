const db = require('../config/db.config.js');
const Factura = db.Factura;

exports.create = (req, res) => {
  let factura = {};

  try {
    factura.no_fact = req.body.no_fact;
    factura.serie = req.body.serie;
    factura.id_cliente = req.body.id_cliente;
    factura.id_empleado = req.body.id_empleado;
    factura.fecha_fac = req.body.fecha_fac;

    Factura.create(factura).then(result => {
      res.status(200).json({
        message: "Upload Successfully a Factura with id = " + result.id_factura,
        factura: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message
    });
  }
}

exports.retrieveAllFacturas = (req, res) => {
  Factura.findAll()
    .then(facturaInfos => {
      res.status(200).json({
        message: "Get all Facturas' Infos Successfully!",
        facturas: facturaInfos
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

exports.getFacturaById = (req, res) => {
  let facturaId = req.params.id;
  Factura.findByPk(facturaId)
    .then(factura => {
      res.status(200).json({
        message: "Successfully Get a Factura with id = " + facturaId,
        factura: factura
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
    let facturaId = req.params.id;
    let factura = await Factura.findByPk(facturaId);

    if (!factura) {
      res.status(404).json({
        message: "Not Found for updating a Factura with id = " + facturaId,
        factura: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        no_fact: req.body.no_fact,
        serie: req.body.serie,
        id_cliente: req.body.id_cliente,
        id_empleado: req.body.id_empleado,
        fecha_fac: req.body.fecha_fac
      };
      let result = await Factura.update(updatedObject, { returning: true, where: { id_factura: facturaId } });

      if (!result) {
        res.status(500).json({
          message: "Error -> Can not update a Factura with id = " + req.params.id,
          error: "Can NOT Updated",
        });
      }

      res.status(200).json({
        message: "Update successfully a Factura with id = " + facturaId,
        factura: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> Can not update a Factura with id = " + req.params.id,
      error: error.message
    });
  }
}

exports.deleteById = async (req, res) => {
  try {
    let facturaId = req.params.id;
    let factura = await Factura.findByPk(facturaId);

    if (!factura) {
      res.status(404).json({
        message: "Does Not exist a Factura with id = " + facturaId,
        error: "404",
      });
    } else {
      await factura.destroy();
      res.status(200).json({
        message: "Delete Successfully a Factura with id = " + facturaId,
        factura: factura,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> Can NOT delete a Factura with id = " + req.params.id,
      error: error.message,
    });
  }
}
