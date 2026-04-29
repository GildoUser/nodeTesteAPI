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
        const resultData = productsValidator.validateCreateProduct(rawData);
        const result = await products.createProduct(resultData);

        const newProduct = {id: result, ...resultData };

        return newProduct
    }

    async updateProduct(id, rawData){
        const resultData = productsValidator.validateUpdateProduct(rawData);
        const product = await products.getOne(id);
        if(!product) return null;
        
        const updatedData = {
            name: resultData.name ?? product.name,
            price: resultData.price ?? product.price,
            description: resultData.description ?? product.description
        };
        
        console.log(updatedData)
        const updatedProduct = await products.updateProduct(updatedData, id);
        return updatedProduct;

    }

    async deleteProduct(id){
        const resultDeleted = await products.deleteProduct(id);
        if(resultDeleted ==0){
            const error = new Error("produto não encontrado");
            error.status = 404;
            throw error;
        }
        return resultDeleted;
    }
}

module.exports = new ProductsService();