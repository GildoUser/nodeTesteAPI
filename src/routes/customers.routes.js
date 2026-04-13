const { Router } = require('express');
const customersRoutes = new Router();

const customersController = require('../controller/CustomersController');

// rotas customers
customersRoutes.get('/', customersController.getAll);
customersRoutes.get('/:id', customersController.getOne);
customersRoutes.post('/', customersController.createCustomer);
customersRoutes.patch('/:id', customersController.updateCustomer);
customersRoutes.delete('/:id', customersController.deleteCustomer);

module.exports = customersRoutes;