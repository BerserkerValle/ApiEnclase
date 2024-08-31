const db = require('../config/db.config.js');
const Producto = db.Producto;

exports.create = (req, res) => {
    let producto = {};

    try {
        producto.descripcion = req.body.descripcion;
        producto.stock = req.body.stock;
        producto.stock_minimo = req.body.stock_minimo;
        producto.precio_unitario = req.body.precio_unitario;
        producto.id_proveedor = req.body.id_proveedor;

        Producto.create(producto).then(result => {    
            res.status(200).json({
                message: "Upload Successfully a Producto with id = " + result.id_producto,
                producto: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllProductos = (req, res) => {
    Producto.findAll()
        .then(productoInfos => {
            res.status(200).json({
                message: "Get all Productos' Infos Successfully!",
                productos: productoInfos
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

exports.getProductoById = (req, res) => {
    let productoId = req.params.id;
    Producto.findByPk(productoId)
        .then(producto => {
            res.status(200).json({
                message: "Successfully Get a Producto with id = " + productoId,
                producto: producto
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
        let productoId = req.params.id;
        let producto = await Producto.findByPk(productoId);

        if (!producto) {
            res.status(404).json({
                message: "Not Found for updating a Producto with id = " + productoId,
                producto: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                descripcion: req.body.descripcion,
                stock: req.body.stock,
                stock_minimo: req.body.stock_minimo,
                precio_unitario: req.body.precio_unitario,
                id_proveedor: req.body.id_proveedor
            }
            let result = await Producto.update(updatedObject, { returning: true, where: { id_producto: productoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a Producto with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Producto with id = " + productoId,
                producto: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a Producto with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let productoId = req.params.id;
        let producto = await Producto.findByPk(productoId);

        if (!producto) {
            res.status(404).json({
                message: "Does Not exist a Producto with id = " + productoId,
                error: "404",
            });
        } else {
            await producto.destroy();
            res.status(200).json({
                message: "Delete Successfully a Producto with id = " + productoId,
                producto: producto,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a Producto with id = " + req.params.id,
            error: error.message,
        });
    }
}
