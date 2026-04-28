
const { Router } = require('express');
const ordersRoutes = new Router();

const ordersController = require('../controller/orders.controller');


ordersRoutes.get('/', ordersController.getAll)
ordersRoutes.get('/:id', ordersController.getOne);
ordersRoutes.get('/:id/full', ordersController.getFullOrder)

ordersRoutes.post('/', ordersController.createOrder);

module.exports = ordersRoutes;