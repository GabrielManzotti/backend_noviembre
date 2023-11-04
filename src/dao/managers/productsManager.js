import { productsModel } from "../../db/models/products.models.js";

class ProductManager {
    async findAll(opt) {
        const result = await productsModel.paginate({}, opt)
        const info = {
            count: result.totalDocs,
            pages: result.totalPages,
            prevPage: result.hasPrevPage,
            nextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `http://localhost:8080/api/products?page=${result.prevPage}` : null,
            nextLink: result.hasNextPage ? `http://localhost:8080/api/products?page=${result.nextPage}` : null
        }
        return { info, results: result.docs }
    }

    async find() {
        return productsModel.find().lean()
    }

    async findByCategory(category, opt) {
        const result = await productsModel.paginate({ category: category }, opt)
        const info = {
            count: result.totalDocs,
            pages: result.totalPages,
            prevPage: result.hasPrevPage,
            nextPage: result.hasNextPage,
            prev: result.hasPrevPage ? `http://localhost:8080/api/products?page=${result.prevPage}` : "none",
            next: result.hasNextPage ? `http://localhost:8080/api/products?page=${result.nextPage}` : "none"
        }
        return { info, results: result.docs }
    }

    async findByPrice(price, opt) {
        const result = await productsModel.paginate({ price: { $gte: price } }, opt)
        const info = {
            count: result.totalDocs,
            pages: result.totalPages,
            prevPage: result.hasPrevPage,
            nextPage: result.hasNextPage,
            prev: result.hasPrevPage ? `http://localhost:8080/api/products/price/${price}?page=${result.prevPage}` : "none",
            next: result.hasNextPage ? `http://localhost:8080/api/products/price/${price}?page=${result.nextPage}` : "none"
        }
        return { info, results: result.docs }
    }

    async findAgregationByCategoryAndPrice(category, price, opt) {
        const response = await productsManager.aggregate([
            { $match: { price: category } },
            { $match: { price: { $gt: price } } }
        ], opt)
        const info = {
            count: result.totalDocs,
            pages: result.totalPages,
            prevPage: result.hasPrevPage,
            nextPage: result.hasNextPage,
            prev: result.hasPrevPage ? `http://localhost:8080/api/products?page=${result.prevPage}` : "none",
            next: result.hasNextPage ? `http://localhost:8080/api/products?page=${result.nextPage}` : "none"
        }
        return { info, results: result.docs }
    }

    async findById(id) {
        return productsModel.findById(id)
    }
    async createOne(obj) {
        return productsModel.create(obj)
    }
    async updateOne(id, obj) {
        return productsModel.updateOne({ _id: id }, obj);
    }
    async deleteOne(id) {
        return productsModel.deleteOne({ _id: id });
    }
}
export const productsManager = new ProductManager();