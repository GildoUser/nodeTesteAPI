const zod = require('zod');

const idSchema = zod.coerce.number().int().gt(0);

function validateId(id){

    const result = idSchema.safeParse(id);
    if(!result.success){
        console.error(result.error.format());
        throw new Error("id invalido");
    }
    return result.data;
}

module.exports = validateId;