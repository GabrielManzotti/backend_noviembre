import objServices from "../services/orders.service.js";

const createOrder = async (req, res) => {
    try {
        const result = await objServices.createOrder(idCart, email)
        res.status(200).json({ message: "Order", order: result })
    } catch (error) {
        res.status(500).json({ message: "error" })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const result = await objServices.getAllOrders()
        res.status(200).json({ message: "Orders", orders: result })
    } catch (error) {
        res.status(500).json({ message: "error" })
    }
}

const purchaseCart = async (req, res) => {
    const { cid } = req.params
    try {
        const result = await objServices.purchaseCart(cid)
        res.status(200).json({ message: "Purchase", cart: result })
    } catch (error) {
        res.status(500).json({ message: "error" })
    }
}

const checkStock = async (req, res) => {
    const { cid } = req.params
    try {
        const result = await objServices.checkStock(cid)
        res.status(200).json({ message: "without stock", products: result })
    } catch (error) {
        res.status(500).json({ message: "error" })
    }
}

const totalAmountOrders = async (req, res) => {
    const { sin } = req.params
    const { to } = req.params
    try {
        const result = await objServices.totalAmountOrders(sin, to)
        res.status(200).json({ message: "Total amount orders", Total: result })
    } catch (error) {
        res.status(500).json({ message: "error!" })
    }
}

const ordersByCustomer = async (req, res) => {
    const { sin } = req.params
    const { to } = req.params
    const { id } = req.params
    try {
        const result = await objServices.ordersByCustomer(id, sin, to)
        res.status(200).json({ message: "Orders by customer", result: result })
    } catch (error) {
        res.status(500).json({ message: "error!" })
    }
}


const obj = {
    createOrder,
    getAllOrders,
    purchaseCart,
    checkStock,
    totalAmountOrders,
    ordersByCustomer
}

export default obj