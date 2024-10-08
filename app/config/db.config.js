

const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions:{
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
 //para mandar al servidor

db.Departamento = require('../models/departamento.js')(sequelize, Sequelize);
db.Empleado = require('../models/empleado.js')(sequelize, Sequelize);
db.Customer = require('../models/customer.model.js')(sequelize, Sequelize);
db.Cliente = require('../models/cliente.js')(sequelize, Sequelize);
db.Proveedor = require('../models/proveedor.js')(sequelize, Sequelize);
db.Producto = require('../models/producto.js')(sequelize,Sequelize);
db.Factura = require('../models/factura.js')(sequelize, Sequelize);
db.FacturaDetalle = require('../models/facturadetalle.js')(sequelize,Sequelize);


module.exports = db;