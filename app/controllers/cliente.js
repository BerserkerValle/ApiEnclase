const db = require("../models");
const Cliente = db.Cliente; 

exports.create = (req, res) => {
  let cliente = {};

  try {
    cliente.nombre = req.body.nombre;
    cliente.apellido = req.body.apellido;
    cliente.razon_social = req.body.razon_social;
    cliente.nit = req.body.nit;
    cliente.direccion = req.body.direccion;
    cliente.telefono = req.body.telefono;
    cliente.email = req.body.email;
    cliente.fecha_ingreso = req.body.fecha_ingreso;
    cliente.estatus = req.body.estatus;

    Cliente.create(cliente).then(result => {
      res.status(200).json({
        message: "Upload Successfully a Cliente with id = " + result.id_cliente,
        cliente: result,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message
    });
  }
}

exports.retrieveAllClientes = (req, res) => {
  Cliente.findAll()
    .then(clienteInfos => {
      res.status(200).json({
        message: "Get all Clientes' Infos Successfully!",
        clientes: clienteInfos
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

exports.getClienteById = (req, res) => {
  let clienteId = req.params.id;
  Cliente.findByPk(clienteId)
    .then(cliente => {
      res.status(200).json({
        message: "Successfully Get a Cliente with id = " + clienteId,
        cliente: cliente
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
    let clienteId = req.params.id;
    let cliente = await Cliente.findByPk(clienteId);

    if (!cliente) {
      res.status(404).json({
        message: "Not Found for updating a Cliente with id = " + clienteId,
        cliente: "",
        error: "404"
      });
    } else {
      let updatedObject = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        razon_social: req.body.razon_social,
        nit: req.body.nit,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email,
        fecha_ingreso: req.body.fecha_ingreso,
        estatus: req.body.estatus
      };
      let result = await Cliente.update(updatedObject, { returning: true, where: { id_cliente: clienteId } });

      if (!result) {
        res.status(500).json({
          message: "Error -> Can not update a Cliente with id = " + req.params.id,
          error: "Can NOT Updated",
        });
      }

      res.status(200).json({
        message: "Update successfully a Cliente with id = " + clienteId,
        cliente: updatedObject,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> Can not update a Cliente with id = " + req.params.id,
      error: error.message
    });
  }
}

exports.deleteById = async (req, res) => {
  try {
    let clienteId = req.params.id;
    let cliente = await Cliente.findByPk(clienteId);

    if (!cliente) {
      res.status(404).json({
        message: "Does Not exist a Cliente with id = " + clienteId,
        error: "404",
      });
    } else {
      await cliente.destroy();
      res.status(200).json({
        message: "Delete Successfully a Cliente with id = " + clienteId,
        cliente: cliente,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error -> Can NOT delete a Cliente with id = " + req.params.id,
      error: error.message,
    });
  }
}
