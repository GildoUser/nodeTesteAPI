const customers = require('../model/Customers');
const schemasCustomer = require('../schemas/SchemasCustomerService');

class CustomersService{
    async getAll(){
        const allCustomers = await customers.getAll();
        return allCustomers;
    }

    async getOne(id){
        const resultId = schemasCustomer.verifyId(id);
        const customer = await customers.getOne(resultId);
        return customer;

    }

    async createCustomer(rawData){
        const resultData = schemasCustomer.verifyNewCustomer(rawData);
        const result = await customers.createCustomer(resultData);
        const newCustomer = {id: result, ...resultData}
        
        return newCustomer
    }

    async updateCustomer(id, rawData){
        const resultId = schemasCustomer.verifyId(id);
        const resultData = schemasCustomer.verifyPartialData(rawData);
        //verifica se o customer existe
        const customer = await customers.getOne(resultId);
        if(!customer) return null

        const updatedData = {
            name: resultData.name ?? customer.name,
            address: resultData.address ?? customer.address,
            email: resultData.email ?? customer.email
        };

        const updatedCustomer = await customers.updateCustomer(updatedData,resultId);

        return {customer: updatedCustomer}
    }  

    async deleteCustomer(id){
        const resultId = schemasCustomer.verifyId(id);
        const resultDeleted = customers.deleteCustomer(id);
        return resultDeleted;

    }
}

module.exports = new CustomersService();