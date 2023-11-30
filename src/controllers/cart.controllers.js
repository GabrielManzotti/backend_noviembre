import objServices from "../services/cart.service.js";

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
    let cartId = req.params.cid
    let productId = req.params.pid
    const { quantity } = req.body
    try {
        const result = await objServices.addAProductInCart(cartId, productId, quantity)
        return res.status(200).json({ message: "Product added", Cart: result })
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
        const deletedCart = await deleteOne(cartId)
        return res.status(200).json({ message: "Cart deleted", Cart: deletedCart })
    } catch (error) {
        res.status(500).json({ message: "error!" })
    }
}

const obj = {
    deleteCart,
    updateInCartAProduct,
    addInCartAProduct,
    findCartById,
    findAllCarts,
    createCart
}

export default obj