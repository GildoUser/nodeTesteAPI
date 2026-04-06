const customersController = require('../controller/CustomersController');

const { Router } = require('express');
const routes = new Router();

// rotas customers
routes.get('/customers', customersController.getAll);
routes.get('/customers/:id', customersController.getOne);
routes.post('/customers', customersController.createCustomer);
routes.patch('/customers/:id', customersController.updateCustomer);
routes.delete('/customers/:id', customersController.deleteCustomer);
module.exports = routes;