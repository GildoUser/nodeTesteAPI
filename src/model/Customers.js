const db = require('../database/database');

class Customers{
    getAll(){
        return new Promise((resolve, reject)=>{
            //LOGICA AQUI
            db.all('SELECT * FROM customers', (err, allCustomers)=>{
                if(err){
                    console.error("Customers.getAll() =>", err.message);
                    reject(err);
                }
                    resolve(allCustomers);
            })
        })
    }
}

module.exports = new Customers();