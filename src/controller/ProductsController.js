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
            next(err)
        }
    }
}

module.exports = new ProductsController();