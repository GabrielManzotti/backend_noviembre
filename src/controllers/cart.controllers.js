import objServices from "../services/cart.service.js";
import { errorMiddleware } from "../errors/error.middleware.js";
import { logger } from "../winston.js";
import { productsManager } from "../dao/managers/productsManager.js";

const createCart = async (req, res) => {
    const cart = await objServices.createOne()
    try {
        res.status(200).json({ message: "cart created", cart: cart })
    } catch (error) {
        res.status(500).json({ message: "error" })
    }
}

const findAllCarts = async (req, res) => {
    const carts = await objServices.findAll(["title", "description", "price"])
    try {
        res.status(200).json({ message: "carts", carts: carts })
    } catch (error) {
        res.status(500).json({ message: "error" })
    }
}

const findCartById = async (req, res) => {
    const idCart = req.params.cid
    try {
        const cart = await objServices.findById(idCart, ["title", "description", "price"])
        return res.status(200).json({ message: "Cart", Cart: cart })
    } catch (error) {
        return res.status(500).json({ message: "error" })
    }
}

const addInCartAProduct = async (req, res) => {
    let email = req.user.email
    let cartId = req.params.cid
    let productId = req.params.pid
    const product = await productsManager.findById(productId)
    const owner = product.owner
    if (owner !== "admin" && owner !== undefined) {
        if (owner !== email) {
            return res.status(400).json({ message: "you are the owner of this product" })
        }
    }
    const { quantity } = req.body
    try {
        const result = await objServices.addAProductInCart(cartId, productId, quantity)
        if (result === "no stock") {
            return res.status(200).json({ message: result, Cart: result })
        }
        else {
            return res.status(200).json({ message: "Product added", Cart: result })
        }
    } catch (error) {
        return res.status(500).json({ message: "error" })
    }
}

const updateInCartAProduct = async (req, res) => {
    let cartId = req.params.cid
    let productId = req.params.pid
    const { quantity } = req.body
    try {
        const result = await objServices.updateAProductInCart(cartId, productId, quantity)
        return res.status(200).json({ message: "Product modified", Cart: result })
    } catch (error) {
        return res.status(500).json({ message: "error" })
    }
}

const deleteCart = async (req, res) => {
    const { cartId } = req.params
    try {
        const deletedCart = await objServices.deleteOne(cartId)
        return res.status(200).json({ message: "Cart deleted", Cart: deletedCart })
    } catch (error) {
        res.status(500).json({ message: "error!" })
    }
}

const deleteAProductInCart = async (req, res) => {
    let cartId = req.params.cid
    let productId = req.params.pid
    try {
        const result = await objServices.deleteAProductInCart(cartId, productId)
        return res.status(200).json({ message: "Product deleted", Cart: result })
    } catch (error) {
        return res.status(500).json({ message: "error" })
    }
}

const resetProductsInCart = async (req, res) => {
    let cartId = req.params.cid
    let { email } = req.body
    try {
        const result = await objServices.resetProductsInCart(cartId, email)
        return res.status(200).json({ message: "Cart reseted", Cart: result })
    } catch (error) {
        return res.status(500).json({ message: "error" })
    }
}


const obj = {
    deleteCart,
    updateInCartAProduct,
    addInCartAProduct,
    findCartById,
    findAllCarts,
    createCart,
    deleteAProductInCart,
    resetProductsInCart
}

export default obj