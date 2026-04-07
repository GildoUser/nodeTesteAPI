const zod = require('zod');


class SchemasCustomerService{
    #idSchema;
    #newCustomerSchema;
    #updateCustomerSchema;

    constructor(){
        this.#idSchema = zod.coerce.number().int().gt(0);
        this.#newCustomerSchema = zod.object({
            name: zod.string().trim().min(2),
            address: zod.string().min(5),
            email: zod.email()
        })
        this.#updateCustomerSchema = zod.object({
            name: zod.string().trim().min(2).optional(),
            address: zod.string().min(5).optional(),
            email: zod.email().optional()
        })

    }

    
    verifyId(id){
        const result = this.#idSchema.safeParse(id);
        if(!result.success){
            console.error(result.error.format())
            throw new Error("id invalido");
        }
        return result.data;
    }

    verifyNewCustomer(rawData){
        const result = this.#newCustomerSchema.safeParse(rawData);
        if(!result.success){
            console.error(result.error.format());
            throw new Error("verifique os dados enviados");
        }
        return result.data
    }

    verifyPartialData(rawData){
        const result = this.#updateCustomerSchema.safeParse(rawData);
        if(!result.success){
            console.error(result.error.format());
            throw new Error("erro ao verificar os dados recebidos")
        }
        return result.data;

    }
}

module.exports = new SchemasCustomerService();