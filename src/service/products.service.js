const products = require('../model/Products')
const productsValidator = require('../validators/products.validator');



class ProductsService{
    async getAll(){
        const allProducts = await products.getAll();
        return allProducts;
    }

    async getOne(id){
        const product = await products.getOne(id);
        return product;
    }

    async createProduct(rawData){
        console.log("chegou aqui")
        const resultData = productsValidator.validateCreateProduct(rawData);
        const result = await products.createProduct(resultData);
        const newProduct = {id: result, ...resultData }
        return newProduct
    }
}

module.exports = new ProductsService();