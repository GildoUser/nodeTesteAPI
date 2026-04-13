const db = require('../database/database');
class Products{
    getAll(){
        return new Promise((resolve, reject)=>{
            db.all('SELECT * FROM products', (err, allProducts)=>{
                if(err) return reject(err);
                resolve(allProducts);
            });
        });
    }

    getOne(id){
        return new Promise((resolve, reject)=>{
            db.get(`SELECT * FROM products WHERE id = ?`, [id], (err, product)=>{
                if(err) return reject(err);
                if(!product) resolve(null);
                resolve(product)

            })
        });
    }

    createProduct(data){
        return new Promise((resolve, reject)=>{
            db.run(`INSERT INTO products (name, price,description)
                VALUES (?,?,?)`, [data.name, data.price, data.description], function(err){
                    if(err) return reject(err);
                    resolve(this.lastID)
                });
        });
    }

    updateProduct(data, id){
        return new Promise((resolve, reject)=>{
            db.run(`UPDATE products SET name = ?, price = ?, description = ? 
                WHERE id = ? `, [data.name, data.price, data.description, id], function(err){
                    if(err) return reject(err);
                    resolve({id: id, ...data})
            })
        })
    }

    deleteProduct(id){
        return new Promise((resolve, reject)=>{
            db.run('DELETE FROM products WHERE id = ?',[id], function(err){
                if(err) return reject(err);
                resolve(this.changes);
            })
        })
    }
}

module.exports = new Products();