const customersService = require('../service/customers.service');
const validateId = require('../validators/id.validator')

class CustomersController{
    async getAll(req, res, next){
        try{
            const allCustomers = await customersService.getAll();
            res.status(200).json({allCustomers});
        }catch(err){
            next(err)
        }
    }

    async getOne(req, res, next){
        try{
            const id = validateId(req.params.id);
            const customer = await customersService.getOne(id);
            if(!customer){
                const error = new Error("nada foi encontrado");
                error.status = 404;
                return next(error);
            }
            res.status(200).json({customer});
        }catch(err){
            next(err);
        }
    }

    async createCustomer(req, res, next){
        try{
            const customer = await customersService.createCustomer(req.body);
            res.status(201).json({message: "criado com sucesso", customer})
        }catch(err){
            next(err);
       }
    }

    async updateCustomer(req, res, next){
        try{
            const id = validateId(req.params.id);
            const updatedCustomer = await customersService.updateCustomer(id, req.body);
            if(!updatedCustomer){
                const error = new Error("não foi encontrado");
                error.status = 404;
                return next(error);
            } 
            res.status(200).json({updatedCustomer})
        }catch(err){
            next(err);
        }
    }
    
    async deleteCustomer(req, res, next){
        try{
            const id = validateId(req.params.id);
            const confirmation = await customersService.deleteCustomer(id);
            res.status(200).json({message: `${confirmation} linha(s) apagada(s)!`})
        }catch(err){
            next(err);
        }
    }
}

module.exports = new CustomersController();