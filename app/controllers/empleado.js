const db = require('../config/db.config.js');
const Empleado = db.Empleado;

exports.create = (req, res) => {
    let empleado = {};

    try {
        empleado.id_empleado = req.body.id_empleado;
        empleado.primer_nombre = req.body.primer_nombre;
        empleado.segundo_nombre = req.body.segundo_nombre;
        empleado.primer_apellido = req.body.primer_apellido;
        empleado.segundo_apellido = req.body.segundo_apellido;
        empleado.nit = req.body.nit;
        empleado.salario = req.body.salario;
        empleado.estatus = req.body.estatus;
        empleado.id_departamento = req.body.id_departamento;

        Empleado.create(empleado).then(result => {
            res.status(200).json({
                message: "Empleado creado exitosamente con ID = " + result.id_empleado,
                empleado: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

exports.retrieveAllEmpleados = (req, res) => {
    Empleado.findAll()
        .then(empleados => {
            res.status(200).json({
                message: "Todos los empleados obtenidos exitosamente!",
                empleados: empleados
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.getEmpleadoById = (req, res) => {
    let empleadoId = req.params.id;

    Empleado.findByPk(empleadoId)
        .then(empleado => {
            if (!empleado) {
                res.status(404).json({
                    message: "Empleado no encontrado con ID = " + empleadoId,
                    empleado: null
                });
            } else {
                res.status(200).json({
                    message: "Empleado obtenido exitosamente con ID = " + empleadoId,
                    empleado: empleado
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "No se encontró un empleado con ID = " + empleadoId,
                empleado: null,
                error: "404"
            });
        } else {
            let updatedObject = {
                primer_nombre: req.body.primer_nombre,
                segundo_nombre: req.body.segundo_nombre,
                primer_apellido: req.body.primer_apellido,
                segundo_apellido: req.body.segundo_apellido,
                nit: req.body.nit,
                salario: req.body.salario,
                estatus: req.body.estatus,
                id_departamento: req.body.id_departamento
            };

            let result = await Empleado.update(updatedObject, { returning: true, where: { id_empleado: empleadoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error! No se pudo actualizar el empleado con ID = " + req.params.id,
                    error: "No se pudo actualizar"
                });
            }

            res.status(200).json({
                message: "Empleado actualizado exitosamente con ID = " + empleadoId,
                empleado: updatedObject
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error! No se pudo actualizar el empleado con ID = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "No existe un empleado con ID = " + empleadoId,
                error: "404"
            });
        } else {
            await empleado.destroy();
            res.status(200).json({
                message: "Empleado eliminado exitosamente con ID = " + empleadoId,
                empleado: empleado
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error! No se pudo eliminar el empleado con ID = " + req.params.id,
            error: error.message
        });
    }
};
