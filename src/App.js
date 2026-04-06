const express = require('express');
const routes = require('./routes/routes');
const morgan = require('morgan');

class App{
    constructor(){
        this.server = express();
        this.middlewares();
        this.router(routes);
    }

    router(routes){
        this.server.use(routes);
    }

    middlewares(){
        this.server.use(express.json());
        this.server.use(morgan());
    }
}

module.exports = new App().server;