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
        db.all(`SELECT o.id, o.customer_id, o.created_at, o.status, 
            o_i.order_id, o_i.product_id FROM orders as o INNER JOIN orders_items as o_i on o.id = o_i.order_id WHERE o.id = ?`,[id], function(err, orders){
            if(err) return reject(err);
            resolve(orders);

        })
    });
}

function createOrder(orderService){
    if(orderService.order_items.length == 0){
        throw new Error('order sem itens')
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