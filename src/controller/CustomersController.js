const customersService = require('../service/CustomersService');

class CustomersController{
    async getAll(req, res){
        try{
            const allCustomers = await customersService.getAll();
            res.status(200).json({allCustomers});
        }catch(err){
            return res.status(500).json({error: err.message});
        }
    }

    async getOne(req, res){
        try{
            const customer = await customersService.getOne(req.params.id);
            res.status(200).json({customer});
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }

    async createCustomer(req, res){

    }

    async updateCustomer(req, res){

    }
    
    async deleteCustomer(req, res){

    }
}

module.exports = new CustomersController();