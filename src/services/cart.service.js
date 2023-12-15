import { cartsManager } from "../dao/managers/cartsManager.js";

const findAll = (atributes) => {
    const result = cartsManager.findAll(atributes)
    return result
}

const findById = (id, atributes) => {
    const result = cartsManager.findById(id, atributes)
    return result
}

const createOne = (obj) => {
    const result = cartsManager.createOne(obj)
    return result
}

const addAProductInCart = (cartId, productId, quantity) => {
    const result = cartsManager.addAProductInCart(cartId, productId, quantity)
    return result
}

const updateAProductInCart = (cartId, productId, quantity) => {
    const result = cartsManager.updateAProductInCart(cartId, productId, quantity)
    return result
}

const deleteOne = (id) => {
    const result = cartsManager.deleteOne(id)
    return result
}

const deleteAProductInCart = (cartId, productId) => {
    const result = cartsManager.deleteAProductInCart(cartId, productId)
    return result
}

const resetProductsInCart = (cartId, email) => {
    const result = cartsManager.resetProductsInCart(cartId, email)
    return result
}

const obj = {
    findAll,
    findById,
    createOne,
    addAProductInCart,
    updateAProductInCart,
    deleteOne,
    deleteAProductInCart,
    resetProductsInCart

}

export default obj