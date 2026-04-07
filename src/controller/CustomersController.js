const customersService = require('../service/CustomersService');

class CustomersController{
    async getAll(req, res){
        try{
            const allCustomers = await customersService.getAll();
            res.status(200).json({allCustomers});
        }catch(err){
            res.status(500).json({error: err.message});
        }
    }

    async getOne(req, res){
        try{
            const customer = await customersService.getOne(req.params.id);
            if(!customer) res.status(404).json({message: "nada foi encontrado"})
            res.status(200).json({customer});
        }catch(err){
            res.status(500).json({error: err.message})
        }
    }

    async createCustomer(req, res){
        try{
            const customer = await customersService.createCustomer(req.body);
            res.status(201).json({message: "criado com sucesso", customer})
        }catch(err){
        res.status(500).json({error: err.message})
       }
    }

    async updateCustomer(req, res){
        try{
            const updatedCustomer = await customersService.updateCustomer(req.params.id, req.body);
            if(!updatedCustomer) return res.status(404).json({message: "não foi encontrado"})
            res.status(200).json({updatedCustomer})
        }catch(err){
            res.status(500).json({error: err.message})
        }
    }
    
    async deleteCustomer(req, res){
        try{
            const confirmation = await customersService.deleteCustomer(req.params.id);
            res.status(200).json({message: `sucesso! ${confirmation} linha(s) apagada(s)`})
        }catch(err){
            res.status(500).json({error: err.message})
        }
    }
}

module.exports = new CustomersController();