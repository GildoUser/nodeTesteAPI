const orders = require('../model/orders');
const customersService = require('./customers.service');
const productsService = require('./products.service');

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

async function getFullOrder(id){

}

async function createOrder(orderService){
    const customer = await customersService.getOne(orderService.customer_id);

    const order_items_com_preco = await Promise.all(
        orderService.order_items.map(async (productOrder)=>{
            const product = await productsService.getOne(productOrder.product_id);

            if(!product) {
                throw new Error (` produto ${productOrder.product_id} não encontrado`)
            }

            return {...productOrder, unity_price: product.price}
        })
    )

    orderService.order_items = order_items_com_preco;
    
    const createdOrderId = await orders.createOrder(orderService);
    orderService.order_id = createdOrderId;

    return orderService
}

module.exports = {
    getAll,
    getOne,
    createOrder,
    getFullOrder
}