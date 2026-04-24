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

function createOrder(orderService){
    const order_id;
    return new Promise((resolve, reject)=>{
        db.serialize(()=>{
                        
            db.run(`INSERT INTO orders (customer_id) VALUES (?)`,
                [orderService.customer_id], function(err){
                if(err) return reject(err);
            })

            db.run(``)

        });
    });
}

module.exports = {
    getAll,
    getOne,
    createOrder,
}