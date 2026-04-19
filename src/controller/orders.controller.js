const ordersService = require('../service/orders.service');
const validateId = require('../validators/id.validator');

async function getAll(req, res, next){
    try{
        const orders = await ordersService.getAll();
        res.status(200).json({orders});
    }catch(err){
        next(err);
    }
}

async function getOne(req, res, next){
    try{
        const id = validateId(req.params.id);
        const order = await ordersService.getOne(id);
        res.status(200).json({order});
    }catch(err){
        next(err);
    }
}

async function createOrder(req, res, next){
    try{
        const id = validateId(req.params.customer_id);
        const order = await ordersService.createOrder(id);

        res.status(201).json({message: "order criada com sucesso", order});
    }catch(err){
        console.log("oi")
        next(err);
    }
}

module.exports = {
    getAll,
    getOne,
    createOrder
}