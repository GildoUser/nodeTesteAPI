const { Router } = require('express');
const productsRoutes = new Router();

const productsController = require('../controller/ProductsController');

productsRoutes.get('/', productsController.getAll);
productsRoutes.get('/:id', productsController.getOne);

productsRoutes.post('/', productsController.createProduct);

module.exports = productsRoutes;