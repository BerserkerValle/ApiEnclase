
let express = require('express');
let router = express.Router();

const customers = require('../controllers/controller.js');
const empleados = require('../controllers/empleado.js')
const departamentos = require('../controllers/departamento.js');
const clientes = require("../controllers/cliente.js");

router.post('/api/customers/create', customers.create);
router.get('/api/customers/all', customers.retrieveAllCustomers);
router.get('/api/customers/onebyid/:id', customers.getCustomerById);
router.get('/api/customers/filteringbyage', customers.filteringByAge);
router.get('/api/customers/pagination', customers.pagination);
router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);
router.put('/api/customers/update/:id', customers.updateById);
router.delete('/api/customers/delete/:id', customers.deleteById);

 
router.post('/api/clientes/create', clientes.create);
router.get('/api/clientes/all', clientes.retrieveAllClientes);
router.get('/api/clientes/onebyid/:id', clientes.getClienteById);
router.put('/api/clientes/update/:id', clientes.updateById);
router.delete('/api/clientes/delete/:id', clientes.deleteById);


router.post('/api/empleados/create', empleados.create);
router.get('/api/empleados/all', empleados.retrieveAllEmpleados);
router.get('/api/empleados/onebyid/:id', empleados.getEmpleadoById);
router.put('/api/empleados/update/:id', empleados.updateById);
router.delete('/api/empleados/delete/:id', empleados.deleteById);


router.post('/api/departamentos/create', departamentos.create);
router.get('/api/departamentos/all', departamentos.retrieveAllDepartamentos);
router.get('/api/departamentos/onebyid/:id', departamentos.getDepartamentoById);
router.put('/api/departamentos/update/:id', departamentos.updateById);
router.delete('/api/departamentos/delete/:id', departamentos.deleteById);


module.exports = router;

