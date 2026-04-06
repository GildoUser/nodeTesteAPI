const customers = require('../model/Customers');
const schemasCustomer = require('../schemas/SchemasCustomerService');

class CustomersService{
    async getAll(){
        const allCustomers = await customers.getAll();
        return allCustomers;
    }

    async getOne(id){
         const parsedId = schemasCustomer.verifyId(id);
        
    }
}

module.exports = new CustomersService();