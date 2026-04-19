const productsService = require('../service/products.service');
const validateId = require('../validators/id.validator');

class ProductsController{
    async getAll(req,res, next){
        try{
            const allProducts = await productsService.getAll();
            res.status(200).json({allProducts});
        }catch(err){
            next(err);
        }
    }

    async getOne(req, res, next){
        try{
            const id = validateId(req.params.id);
            const product = await productsService.getOne(id);
            console.log(product)
            if(!product) return res.status(404).json({message: "não encontrado"})
            res.status(200).json({product})
        }catch(err){
            next(err);
        }
    }

    async createProduct(req, res, next){
        try{
             const product = await productsService.createProduct(req.body);
             res.status(201).json({product});
        }catch(err){
            next(err);
        }
    }

    async updateProduct(req, res, next){
        try{
            const id = validateId(req.params.id);
            const updatedProduct = await productsService.updateProduct(id, req.body);
            if(!updatedProduct){
                const newError = new Error("não foi encontrado");
                newError.status = 404;
                return next(newError);
            }
            res.status(200).json({updatedProduct});
        }catch(err){
            next(err);
        }
    }

    async deleteProduct(req, res, next){
        try{
            const id = validateId(req.params.id);
            const confirmation = await productsService.deleteProduct(id);
            res.status(200).json({message: `${confirmation} linha(s) apagada(s)!`})
        }catch(err){
            next(err);
        }
    }
}

module.exports = new ProductsController();