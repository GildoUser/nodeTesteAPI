const zod = require('zod');

const newProductSchema = zod.object({
    name: zod.string().min(2).trim(),
    price: zod.coerce.number().int().positive(),
    description: zod.string().optional()
})

const updateProductSchema = zod.object({
    name: zod.string().min(2).trim().optional(),
    price: zod.coerce.number().int().positive().optional(),
    description: zod.string().optional()
})

function validateCreateProduct(rawData){
    
    const result = newProductSchema.safeParse(rawData);
    if(!result.success){
        console.error(result.error.format());
        throw new Error("verifique os dados enviados"); 
    }
    return result.data;
}

function validateUpdateProduct(rawData){
    const result = updateProductSchema.safeParse(rawData);
    if(!result.success){
        console.error(result.error.format());
        throw new Error("verifique os dados enviados");
    }
    return result.data;
}

module.exports = {
    validateCreateProduct,
    validateUpdateProduct

}