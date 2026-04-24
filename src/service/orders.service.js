const orders = require('../model/orders');
const customersService = require('./customers.service');

async function getAll(){
    const allOrders = await orders.getAll();
    return allOrders;
}

async function getOne(id){
    const customer = await orders.getOne(id);
    if(!customer){
        const error = new Error("order não encontrada");
        error.status(404);
        return error
    }
    return customer;
}

async function createOrder(orderService){
    const customer = await customersService.getOne(orderService.customer_id);
    if(!customer){
        const error = new Error("customer não encontrado");
        error.status = 404;
        throw error
    }
    const order = await orders.createOrder(orderService);

    return order;

}

module.exports = {
    getAll,
    getOne,
    createOrder,
    
}