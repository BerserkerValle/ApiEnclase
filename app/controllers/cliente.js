const db = require("../models");
const Cliente = db.cliente;


exports.create = (req, res) => {

  if (!req.body.nombre || !req.body.apellido) {
    res.status(400).send({
      message: "El contenido no puede estar vacío"
    });
    return;
  }


  const cliente = {
    id_cliente: req.body.id_cliente,
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


  Cliente.create(cliente)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear el Cliente."
      });
    });
};


exports.findAll = (req, res) => {
  Cliente.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al recuperar los Clientes."
      });
    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;

  Cliente.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se puede encontrar Cliente con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error al recuperar Cliente con id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Cliente.update(req.body, {
    where: { id_cliente: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cliente fue actualizado exitosamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar Cliente con id=${id}. Tal vez Cliente no fue encontrado o req.body está vacío.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error al actualizar Cliente con id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Cliente.destroy({
    where: { id_cliente: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cliente fue eliminado exitosamente."
        });
      } else {
        res.send({
          message: `No se puede eliminar Cliente con id=${id}. Tal vez Cliente no fue encontrado.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "No se pudo eliminar Cliente con id=" + id
      });
    });
};
