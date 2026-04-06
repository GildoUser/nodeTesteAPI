const zod = require('zod');


class SchemasCustomerService{
    constructor(){
        this.idSchema = zod.coerce.number().int().gt(0) 
    }
    
    verifyId(id){
        const result = this.idSchema.safeParse(id);
        if(!result.success){
            console.error(result.error.format())
            throw new Error("id invalido");
        }
        return result.data;
    }
}

module.exports = new SchemasCustomerService();