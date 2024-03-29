import objService from "../services/products.service.js";
import { errorMiddleware } from "../errors/error.middleware.js";
import { errorMessages } from "../errors/error.enum.js";
import { usersManager } from "../dao/managers/usersManager.js";
import { productsManager } from "../dao/managers/productsManager.js";
import { sendEmail } from "../utils.js";
import { usersModel } from "../db/models/users.models.js";


const createProduct = async (req, res, next) => {
    const { title, description, code, price, status, stock, category, thumbnail, owner } = req.body
    if (!title || !description || !price || !code || !stock || !status || !category) {
        return res.status(400).json({ message: 'Some data is missing' })
    }
    let ownerBody = owner
    if (ownerBody === "true") {
        ownerBody = req.user.email
    } else {
        ownerBody = "admin"
    }
    const obj = {
        title: title,
        description: description,
        code: code,
        price: price,
        status: status,
        stock: stock,
        category: category,
        thumbnail: thumbnail,
        owner: ownerBody
    }
    try {
        const createdProduct = await objService.createOne(obj)
        res.status(200).json({ message: "product created", product: createdProduct })
    } catch (error) {
        error
        next(error)
    }
}

const findAllProducts = async (req, res, next) => {
    try {
        const products = await objService.findAll(req.query)
        if (products) {
            return res.status(200).json({ message: "products", Products: products })
        } else {
            return res.status(404).json({ message: "no found products" })
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
            return res.status(200).json({ message: "Products", Products: result })
        } else {
            return res.status(404).json({ message: "no found products" })
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
            return res.status(404).json({ message: "no found products" })
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
            return res.status(400).json({ message: "no found products" })
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
    const emailSession = req.user.email
    const product = await productsManager.findById(idProduct)
    let userDB
    if (product.owner !== "admin") {
        userDB = await usersManager.findByEmail(product.owner)
        if (product.owner !== emailSession) {
            return res.status(400).json({ message: "you are not the owner of this product" })
        }
    } else {
        if (req.user.role !== "admin") {
            return res.status(400).json({ message: "you have to be admin to deleted this product" })
        }
    }
    try {
        const deletedProduct = await objService.deleteOne(idProduct);
        if (deletedProduct === "deleted") {
            if (userDB) {
                const subject = "Product eliminated"
                const text = `The product ${product.title} (id: ${product.id}) was eliminated`
                await sendEmail(subject, userDB.email, text)
            }
            return res.status(200).json({ message: "Product deleted", Product: deletedProduct })
        }
        if (deletedProduct === "No product") {
            return res.status(404).json({ message: "no found products" })
        }
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