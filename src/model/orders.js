const db = require('../database/database');

function getAll(){
    return new Promise((resolve, reject)=>{
        db.all('SELECT * FROM orders', function(err, orders){
            if(err){
                console.log(err)
                return reject(err);
            } 
            console.log(orders)
            resolve(orders)
        })
    })
}

function getOne(id){
    return new Promise((resolve, reject)=>{
        db.get('SELECT * FROM orders WHERE id = ?', [id], function(err, order){
            if(err) return reject(err);
            if(!order) return resolve(null);
            resolve(order);
        })
    });
}

function getFullOrder(id){
    return new Promise((resolve, reject)=>{
        db.all(`SELECT orders.customer_id, orders.created_at, orders.status,
            o_items.product_id, o_items.quantity, o_items.unity_price,
            p.name, p.price
            FROM orders 
            INNER JOIN orders_items as o_items on orders.id = o_items.order_id
            INNER JOIN products as p on o_items.product_id = p.id
            WHERE orders.id = ?`,[id], function(err, orders){
            if(err) return reject(err);
            resolve({order_id: id, order_items: orders});

        })
    });
}

function createOrder(orderService){
    if(orderService.order_items.length == 0){
        const error = new Error('order sem itens');
        error.status = 400;
        throw error;

    }
    return new Promise((resolve, reject)=>{
        db.serialize(()=>{
                        
            db.run(`INSERT INTO orders (customer_id) VALUES (?)`,
                [orderService.customer_id], function(err){
                if(err) return reject(err);

                const order_id = this.lastID;
                let itemsProcessed = 0;
                
                orderService.order_items.forEach(product =>{
                    db.run(`INSERT INTO orders_items (
                        order_id, product_id, quantity, unity_price
                        ) VALUES (?,?,?,?)`, [order_id, product.product_id, product.quantity, product.unity_price], function(err){
                            if(err) return reject(err);
                            itemsProcessed ++;

                            if (itemsProcessed == orderService.order_items.length) resolve(order_id)
                        })
                    })
                })

            

            

        });
    });
}

module.exports = {
    getAll,
    getOne,
    createOrder,
    getFullOrder
}