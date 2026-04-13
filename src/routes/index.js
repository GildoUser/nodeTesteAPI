const { Router } = require('express');
const routes = new Router();

const customersRoutes = require('./customers.routes');
const productsRoutes = require('./products.routes');

routes.use("/customers", customersRoutes);
routes.use("/products", productsRoutes);


module.exports = routes;