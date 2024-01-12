import { ordersManager } from "../dao/managers/ordersManager.js"

const createOrder = (idCart, email, atributes) => {
    const result = ordersManager.createOne(idCart, email, atributes)
    return result
}

const getAllOrders = () => {
    const result = ordersManager.findAll()
    return result
}

const purchaseCart = (idCart) => {
    const result = ordersManager.purchaseCart(idCart)
    return result
}

const checkStock = (idCart) => {
    const result = ordersManager.checkStock(idCart)
    return result
}

const totalAmountOrders = (since, to) => {
    const result = ordersManager.totalAmountOrders(since, to)
    return result
}

const obj = {
    createOrder,
    getAllOrders,
    purchaseCart,
    checkStock,
    totalAmountOrders
}

export default obj