const db = require('../config/db.config.js');
const Proveedor = db.Proveedor;

exports.create = (req, res) => {
    let proveedor = {};

    try {
        proveedor.empresa = req.body.empresa;
        proveedor.direccion = req.body.direccion;
        proveedor.telefono = req.body.telefono;
        proveedor.nit = req.body.nit;
        proveedor.ciudad = req.body.ciudad;
        proveedor.pais = req.body.pais;
        proveedor.contacto = req.body.contacto;
        proveedor.email = req.body.email;
        proveedor.telefono_contacto = req.body.telefono_contacto;
        proveedor.estatus = req.body.estatus;

        Proveedor.create(proveedor).then(result => {
            res.status(200).json({
                message: "Upload Successfully a Proveedor with id = " + result.id_proveedor,
                proveedor: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllProveedores = (req, res) => {
    Proveedor.findAll()
        .then(proveedorInfos => {
            res.status(200).json({
                message: "Get all Proveedores' Infos Successfully!",
                proveedores: proveedorInfos
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

exports.getProveedorById = (req, res) => {
    let proveedorId = req.params.id;
    Proveedor.findByPk(proveedorId)
        .then(proveedor => {
            res.status(200).json({
                message: "Successfully Get a Proveedor with id = " + proveedorId,
                proveedor: proveedor
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
        let proveedorId = req.params.id;
        let proveedor = await Proveedor.findByPk(proveedorId);

        if (!proveedor) {
            res.status(404).json({
                message: "Not Found for updating a Proveedor with id = " + proveedorId,
                proveedor: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                empresa: req.body.empresa,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                nit: req.body.nit,
                ciudad: req.body.ciudad,
                pais: req.body.pais,
                contacto: req.body.contacto,
                email: req.body.email,
                telefono_contacto: req.body.telefono_contacto,
                estatus: req.body.estatus
            };
            let result = await Proveedor.update(updatedObject, { returning: true, where: { id_proveedor: proveedorId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a Proveedor with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Proveedor with id = " + proveedorId,
                proveedor: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a Proveedor with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let proveedorId = req.params.id;
        let proveedor = await Proveedor.findByPk(proveedorId);

        if (!proveedor) {
            res.status(404).json({
                message: "Does Not exist a Proveedor with id = " + proveedorId,
                error: "404",
            });
        } else {
            await proveedor.destroy();
            res.status(200).json({
                message: "Delete Successfully a Proveedor with id = " + proveedorId,
                proveedor: proveedor,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a Proveedor with id = " + req.params.id,
            error: error.message,
        });
    }
}
