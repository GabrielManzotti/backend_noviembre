import { Router } from "express";
import { productsManager } from "../dao/managers/productsManager.js";
import { cartsManager } from "../dao/managers/cartsManager.js";
import { ordersManager } from "../dao/managers/ordersManager.js";
import { authMiddleware } from "../midldlewares/auth.middleware.js";

const router = Router()

router.get("/", async (req, res) => {
    try {
        const results = await productsManager.find({})
        const cart = req.user.cart._id.toString();
        const role = req.user.role
        res.render('products', { results, first_name: req.user.first_name, email: req.user.email, cart, role })
    } catch (error) {
        res.render("login")
    }
})

router.get('/productsList', (req, res) => {
    res.render('productsList')
})

router.get('/websocket', (req, res) => {
    res.render('websocket')
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { style: 'realTimeProducts.css' })
})

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/home", (req, res) => {

    res.render("home")
})

router.get("/error", (req, res) => {

})

router.get("/github", (req, res) => {
    res.render("github")
})

router.get("/manageProducts", authMiddleware('admin'), (req, res) => {
    res.render('createProducts')
})

router.get("/succesModifyDataProduct", (req, res) => {
    res.render('succesCreatedProduct')
})

router.get("/addProduct", (req, res) => {
    res.render('addProduct')
})

router.get("/purchase", async (req, res) => {
    try {
        const idCart = req.user.cart._id.toString()
        const cart = await cartsManager.findById(idCart)
        const cartProducts = cart.products
        let filteredProducts = []
        let product = {}
        let total = 0
        cartProducts.forEach(async (e) => {
            let title = e.productId.title
            let quantity = e.quantity
            let price = e.productId.price
            let id = e.productId.id
            total = total + (quantity * price)
            product = { title, quantity, price, id }
            filteredProducts.push(product)
        })
        res.render('purchase', { filteredProducts, total: total, idCart })
    } catch (error) {
        res.render("login")
    }
})

router.get("/confirm", async (req, res) => {
    const idCart = req.user.cart._id.toString()
    try {
        const cart = await ordersManager.purchaseCart(idCart)
        let cartFiltered = cart.cartRefreshed.products
        res.render('confirm')
    } catch (error) {
        res.render("login")
    }
})

router.get("/checkStock", async (req, res) => {
    const idCart = req.user.cart._id.toString()
    try {
        const checkStock = await ordersManager.checkStock(idCart)
        let without_stock = checkStock.without_stock
        let with_stock = checkStock.with_stock
        let filteredProducts = []
        let filteredProductsWithStock = []
        let product = {}
        let total = 0
        without_stock.forEach(async (e) => {
            product = { title: e.title, description: e.description, price: e.price }
            filteredProducts.push(product)
        })
        with_stock.forEach(async (e) => {
            total = total + (e.quantity * e.price)
            product = { title: e.title, description: e.description, price: e.price, quantity: e.quantity }
            filteredProductsWithStock.push(product)
        })
        res.render('checkStock', { filteredProducts, filteredProductsWithStock, total })
    } catch (error) {

    }
})

router.get("/checkOut", async (req, res) => {
    const idCart = req.user.cart._id.toString()
    const email = req.user.email
    try {
        const purchase = await ordersManager.purchaseCart(idCart)
        const order = await ordersManager.createOne(idCart, email)
        res.render('checkOut', { order })
    } catch (error) {
        res.render("login")
    }
})


export default router