const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./src/database/database.db', (err)=>{
    if(err) return console.error('erro ao conectar com o banco de dados', err.message);
    console.log('conectado ao banco de dados');

    db.run('PRAGMA foreign_keys = ON', (err)=>{
        if(err) return console.error('erro ao ativar foreign keys', err.message);
        console.log('foreign keys = on');
    });

});

db.serialize(()=>{
    // cria tabela customers
        db.run(`CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            address TEXT NOT NULL,
            email TEXT NOT NULL)`);
        //cria tabela products
        db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price INTEGER,
            is_active INTEGER CHECK(is_active IN (0,1)) DEFAULT 1,
            description TEXT
            )`);
        //cria tabela orders
        db.run(`CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_id INTEGER,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            status TEXT NOT NULL DEFAULT 'pending',
            FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE SET NULL
            )`);
            
            //cria tabela orders_items
        db.run(`CREATE TABLE IF NOT EXISTS orders_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            unity_price INTEGER NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE
            FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE RESTRICT
            )`)

})


module.exports = db;