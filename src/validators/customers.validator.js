const zod = require('zod');

const newCustomerSchema = zod.object({
    name: zod.string().trim().min(2),
    address: zod.string().min(5),
    email: zod.string().email()
})
const updateCustomerSchema = zod.object({
    name: zod.string().trim().min(2).optional(),
    address: zod.string().min(5).optional(),
    email: zod.string().email().optional()
})


function validateCreateCustomer(rawData){
    const result = newCustomerSchema.safeParse(rawData);
    if(!result.success){
        console.error(result.error.format());
        throw new Error("verifique os dados enviados");
    }
    return result.data
}

function validateUpdateCustomer(rawData){
    const result = updateCustomerSchema.safeParse(rawData);
    if(!result.success){
        console.error(result.error.format());
        throw new Error("erro ao verificar os dados recebidos")
    }
    return result.data;

}

module.exports = {validateCreateCustomer, validateUpdateCustomer};