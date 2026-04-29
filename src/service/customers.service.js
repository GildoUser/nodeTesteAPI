const customers = require('../model/Customers');
const customersValidator = require('../validators/customers.validator');

async function getAll(){
    const allCustomers = await customers.getAll();
    return allCustomers;
}

async function getOne(id){
    const customer = await customers.getOne(id);
        if(!customer){
            const error = new Error("customer não foi encontrado");
            error.status = 404;
            throw error;
        }
    
    return customer;
}

async function createCustomer(rawData){
    const resultData = customersValidator.validateCreateCustomer(rawData);
    const result = await customers.createCustomer(resultData);
    const newCustomer = {id: result, ...resultData}  

    return newCustomer
}

async function updateCustomer(id, rawData){
    
    const resultData = customersValidator.validateUpdateCustomer(rawData);
    //verifica se o customer existe
    const customer = await customers.getOne(id);
    if(!customer) return null

    const updatedData = {
            name: resultData.name ?? customer.name,
            address: resultData.address ?? customer.address,
            email: resultData.email ?? customer.email
    };

    const updatedCustomer = await customers.updateCustomer(updatedData,id);

    return {customer: updatedCustomer}
}  

async function deleteCustomer(id){
    const resultDeleted = await customers.deleteCustomer(id);
    console.log(resultDeleted)
    if(resultDeleted ==0){
        const error = new Error("customer não encontrado");
        error.status = 404;
        throw error;
    }
    return resultDeleted;

}


module.exports = {
    getAll,
    getOne,
    createCustomer,
    updateCustomer,
    deleteCustomer
};