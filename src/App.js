const express = require('express');
const routes = require('./routes/index');
const morgan = require('morgan');

class App{
    constructor(){
        this.server = express();
        this.middlewares();
        this.router(routes);
        this.exceptionHandler();
    }

    router(routes){
        this.server.use(routes);
    }

    middlewares(){
        this.server.use(express.json());
        this.server.use(morgan());

    }
    
    exceptionHandler(){
        this.server.use((err, req, res, next)=>{
            res.status(err.status || 500).json({error: err.message})
        })
        
    }
}

module.exports = new App().server;