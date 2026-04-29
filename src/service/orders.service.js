const orders = require('../model/orders');
const customersService = require('./customers.service');
const productsService = require('./products.service');

async function getAll(){
    const allOrders = await orders.getAll();
    return allOrders;
}

async function getOne(id){
    const order = await orders.getOne(id);
    if(!order){
        const error = new Error("order não encontrada");
        error.status = 404;
        throw error
    }
    return order;
}

async function getFullOrder(id){
    const full_order = await orders.getFullOrder(id);
    if(full_order.order_items.length ==0){
       const error = new Error("order não encontrada ou não existe")
       error.status = 404;
       throw error;
    }

    const processed_full_order = {
        order_id: full_order.order_id,
        created_at: full_order.order_items[0].created_at,
        status: full_order.order_items[0].status,
        order_items: full_order.order_items.map(item=>{
            return {
                product_id: item.product_id,
                name: item.name,
                quantity: item.quantity,
                unity_price: item.unity_price
            }
        })
    }


    console.log(processed_full_order)

    return processed_full_order;

}

async function createOrder(orderService){
    const customer = await customersService.getOne(orderService.customer_id);

    const order_items_com_preco = await Promise.all(
        orderService.order_items.map(async (productOrder)=>{
            const product = await productsService.getOne(productOrder.product_id);

            if(!product) {
                const error = new Error (` produto ${productOrder.product_id} não encontrado`);
                error.status = 404;
                throw error;
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