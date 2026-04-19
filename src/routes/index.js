const { Router } = require('express');
const routes = new Router();

const customersRoutes = require('./customers.routes');
const productsRoutes = require('./products.routes');
const ordersRoutes = require('./orders.routes');

routes.use('/customers', customersRoutes);
routes.use('/products', productsRoutes);
routes.use('/orders', ordersRoutes);

module.exports = routes;