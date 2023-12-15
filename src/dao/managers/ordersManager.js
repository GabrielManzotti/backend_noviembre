import { orderModel } from "../../db/models/order.models.js";
import { cartsModel } from "../../db/models/cart.models.js";
import { cartsManager } from "./cartsManager.js";
import { productsManager } from "../managers/productsManager.js"
import { sendEmail } from "../../utils.js";


class OrdersManager {
    async createOne(idCart, email, first_name, last_name, atributes) {
        const totalOrdersInDb = await orderModel.find()
        const lengh = totalOrdersInDb.length
        let id
        if (!totalOrdersInDb.length) {
            id = 1
        } else {
            id = totalOrdersInDb.length + 1
        }
        const cart = await cartsModel.findById(idCart).populate("products.productId", atributes)
        const cartFiltered = cart.products
        let priceTotal = 0
        let quantityTotal = 0
        cartFiltered.forEach((e) => priceTotal += (e.productId.price))
        cartFiltered.forEach((e) => quantityTotal += (e.quantity))
        let totalOrder = priceTotal * quantityTotal
        let ticket = {
            code: id,
            amount: totalOrder,
            products_quantity: quantityTotal,
            products_price: priceTotal,
            purchaser: email
        }
        const result = await orderModel.create(ticket)
        let subject = "Orden generada con éxito"
        let text = "El producto está siendo despachado"
        await sendEmail(subject, email, first_name, last_name, text)
        return ticket
    }

    async findAll() {
        const result = await orderModel.find()
        return result
    }

    async purchaseCart(idCart, atributes) {
        const cart = await cartsModel.findById(idCart).populate("products.productId", ["title", "description", "price"])
        const cartFiltered = cart.products
        let stock = 0
        let id = ""
        let filteredProducts = []
        cartFiltered.forEach(async (e) => {
            let netQuantity;
            id = e.productId.id
            const productById = await productsManager.findById(id)
            stock = productById.stock
            netQuantity = stock - e.quantity
            if (netQuantity > 0) {
                productById.stock = netQuantity
                await productById.save()
            }
            else {
                const filterProduct = await cartsManager.deleteAProductInCart(idCart, id)
                filteredProducts.push(id)
            }
        })
        const cartRefreshed = await cartsModel.findById(idCart).populate("products.productId", ["title", "description", "price"])
        return { cartRefreshed, without_stock: filteredProducts }
    }

    async checkStock(idCart, atributes) {
        const cart = await cartsModel.findById(idCart).populate("products.productId", ["title", "description", "price", "quantity", "stock"])
        const cartFiltered = cart.products
        let stock = 0
        let id = ""
        let title = ""
        let quantity
        let price
        let description = ""
        let cartWitoutStock = []
        let cartOnlyWithStock = []
        cartFiltered.forEach(async (e) => {
            let netQuantity;
            id = e.productId.id
            title = e.productId.title
            price = e.productId.price
            stock = e.productId.stock
            quantity = e.quantity
            description = e.productId.description
            netQuantity = stock - e.quantity
            if (netQuantity < 0) {
                cartWitoutStock.push({ id: id, title: title, price: price, description: description })
            } else {
                cartOnlyWithStock.push({ id: e.productId.id, quantity: e.quantity, title: e.productId.title, price: e.productId.price })
            }
        })
        return { with_stock: cartOnlyWithStock, without_stock: cartWitoutStock }

    }

    async totalAmountOrders() {
        const result = await orderModel.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    },
                }
            },

        ],)
        return result
    }

}


export const ordersManager = new OrdersManager()