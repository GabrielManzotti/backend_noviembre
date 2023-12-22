import objService from "../services/products.service.js";
import { errorMiddleware } from "../errors/error.middleware.js";
import { errorMessages } from "../errors/error.enum.js";


const createProduct = async (req, res, next) => {
    const { title, description, code, price, status, stock, category, thumbnail, } = req.body
    if (!title || !description || !price || !code || !stock || !status || !category) {
        return res.status(400).json({ message: 'Some data is missing' })
    }
    try {
        const createdProduct = await objService.createOne(req.body)
        res.status(200).json({ message: "product created", product: createdProduct })
    } catch (error) {
        error = error.errorMessages.PRODUCTS_CREATE
        next(error)
    }
}

const findAllProducts = async (req, res, next) => {
    try {
        const products = await objService.findAll(req.query)
        if (products) {
            return res.status(200).json({ message: "products", Products: products })
        } else {
            return res.status(404).json({ message: "no found produducts" })
        }
    } catch (error) {
        error = error.errorMessages.PRODUCTS_FIND_ALL_NOT_FOUND
        next(error)
    }
}

const findProductsByCategoryAndPrice = async (req, res, next) => {
    let category = req.params.category
    let price = req.params.price
    try {
        const result = await objService.findAgregationByCategoryAndPrice(category, price, req.query)
        if (result) {
            return res.status(200).json({ message: "Product", Products: result })
        } else {
            return res.status(400).json({ message: "no found produducts" })
        }
    } catch (error) {
        error = error.errorMessages.PRODUCTS_BY_CATEGORY_AND_PRICE_NOT_FOUND
        next(error)
    }
}

const findProductByPrice = async (req, res, next) => {
    const { price } = req.params
    try {
        const products = await objService.findByPrice(price, req.query)
        if (products) {
            return res.status(200).json({ message: "Products", Products: products })
        } else {
            return res.status(404).json({ message: "no found produducts" })
        }
    } catch (error) {
        error = errorMessages.PRODUCTS_BY_PRICE_NOT_FOUND
        next(error)
    }
}

const findProductById = async (req, res, next) => {
    const { idProduct } = req.params
    try {
        const product = await objService.findById(idProduct)
        if (product != "No product") {
            return res.status(200).json({ message: "Product", Product: product })
        } else {
            return res.status(400).json({ message: errorMessages.PRODUCT_BY_ID_NOT_FOUND })
        }
    } catch (error) {
        error = errorMessages.PRODUCT_BY_ID_ENDPOINT_NOT_FOUND
        next(error)
    }

}

const findProductByCategory = async (req, res, next) => {
    const { category } = req.params
    try {
        const result = await objService.findByCategory(category, req.query)

        if (result) {
            return res.status(200).json({ message: "Product", Products: result })
        } else {


            return res.status(400).json({ message: "no found produducts" })
        }
    } catch (error) {
        error = errorMessages.PRODUCTS_BY_CATEGORY
        next(error)
    }
}

const updateProduct = async (req, res) => {
    const { idProduct } = req.params
    try {
        const updatedProduct = await objService.updateOne(idProduct, req.body)
        return res.status(200).json({ message: "Product updated", Product: updatedProduct })
    } catch (error) {
        error = errorMessages.PRODUCTS_UPDATE
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    const { idProduct } = req.params
    try {
        const deletedProduct = await objService.deleteOne(idProduct);
        return res.status(200).json({ message: "Product deleted", Product: deletedProduct })
    } catch (error) {
        error = errorMessages.PRODUCTS_DELETE
        next(error)
    }
}

const obj = {
    createProduct,
    findAllProducts,
    findProductsByCategoryAndPrice,
    findProductByPrice,
    findProductById,
    findProductByCategory,
    updateProduct,
    deleteProduct
}

export default obj