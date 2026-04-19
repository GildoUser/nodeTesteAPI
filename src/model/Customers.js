const db = require('../database/database');

function getAll(){
    return new Promise((resolve, reject)=>{
        db.all('SELECT * FROM customers', (err, allCustomers)=>{
            if(err){
                console.error("Customers.getAll() =>", err.message);
                    return reject(err);
            }
            resolve(allCustomers);
        })
    })
}


function getOne(id){
    return new Promise((resolve, reject)=>{
        db.get('SELECT * FROM customers WHERE id = ?',[id], (err, customer)=>{
            if(err){
                console.error("Customers.getOne() =>", err.message);
            return reject(err);
        };
    
        if(!customer) resolve(null);
        resolve(customer);
        });
    });
}

function createCustomer(data){
    return new Promise((resolve, reject)=>{
        db.run(`INSERT INTO customers (
            name, address, email) VALUES (?,?,?)`,
            [data.name, data.address, data.email],function(err){
                if(err) return reject(err);
            
                console.log(this.lastID)
                resolve(this.lastID)
            })
    });
}

function updateCustomer(data, id){
     return new Promise((resolve, reject)=>{
        db.run(`UPDATE customers SET name = ?, address = ?, email = ?
            WHERE id = ?`, [data.name, data.address, data.email, id], function(err){
                if(err) return reject(err);
                console.log(this)
                resolve({id, ...data})
            });
        });
    }

function deleteCustomer(id){
    return new Promise((resolve, reject)=>{
        db.run('DELETE FROM customers WHERE id = ?', [id], function(err){
            if(err) return reject(err);
            resolve(this.changes)
        })
    })
}


module.exports = {
    getAll,
    getOne,
    createCustomer,
    updateCustomer,
    deleteCustomer
};