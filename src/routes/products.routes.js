const { Router } = require('express');
const productsRoutes = new Router();

const productsController = require('../controller/ProductsController');

productsRoutes.get('/', productsController.getAll);
productsRoutes.get('/:id', productsController.getOne);

productsRoutes.post('/', productsController.createProduct);
productsRoutes.patch('/:id', productsController.updateProduct);
productsRoutes.delete('/:id', productsController.deleteProduct);
module.exports = productsRoutes;