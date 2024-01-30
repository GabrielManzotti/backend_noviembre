import { Router } from "express";
import { productsManager } from "../dao/managers/productsManager.js";
import { cartsManager } from "../dao/managers/cartsManager.js";
import { ordersManager } from "../dao/managers/ordersManager.js";
import { authMiddleware, authMiddlewareTwoRoles } from "../midldlewares/auth.middleware.js";
import { usersManager } from "../dao/managers/usersManager.js";
import { jwtValidation } from "../utils.js";
import { logger } from "../winston.js";

const router = Router()

router.get("/", async (req, res) => {
    try {
        const results = await productsManager.findAll({})
        const products = results.results
        const info = results.info
        let nextLink
        info.nextPage === true ? nextLink = info.nextLink : null
        let filteredProducts = []
        products.forEach(async (e) => {
            let title = e.title
            let description = e.description
            let price = e.price
            let _id = e._id.toString()
            let code = e.code
            let status = e.status
            let category = e.category
            let product = { title, description, code, price, _id, category, status }
            filteredProducts.push(product)
        })
        const cart = req.user.cart._id.toString();
        const role = req.user.role
        let isAdmin
        let isPremium
        role === 'admin' ? isAdmin = true : isAdmin = false
        role === 'premium' ? isPremium = true : isPremium = false
        res.render('products', { nextLink, filteredProducts, first_name: req.user.first_name, email: req.user.email, cart, role, isAdmin, isPremium })
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

router.get("/manageProducts", authMiddlewareTwoRoles('admin', 'premium'), (req, res) => {
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
        let totalFormat
        without_stock.forEach(async (e) => {
            product = { title: e.title, description: e.description, price: e.price }
            filteredProducts.push(product)
        })
        with_stock.forEach(async (e) => {
            total = (total + (e.quantity * e.price))
            totalFormat = total.toLocaleString()
            product = { title: e.title, description: e.description, price: e.price, quantity: e.quantity }
            filteredProductsWithStock.push(product)
        })
        res.render('checkStock', { filteredProducts, filteredProductsWithStock, totalFormat })
    } catch (error) {

    }
})

router.get("/checkOut", async (req, res) => {
    const idCart = req.user.cart._id.toString()
    const email = req.user.email
    const first_name = req.user.first_name
    const last_name = req.user.last_name
    try {
        const purchase = await ordersManager.purchaseCart(idCart)
        const order = await ordersManager.createOne(idCart, email, first_name, last_name)
        const resetCart = await cartsManager.resetProductsInCart(idCart, email)
        res.render('checkOut', { order })
    } catch (error) {
        res.render("login")
    }
})

router.get("/backOfficeHome", authMiddlewareTwoRoles('admin', 'premium'), (req, res) => {
    res.render("backOfficeHome")
})

router.get("/generateAdmins", authMiddleware('admin'), async (req, res) => {
    try {
        const admins = await usersManager.getAdminsUsers()
        let adminsArray = []
        let adm
        admins.forEach(async (e) => {
            adm = { id: e._id, first_name: e.first_name, last_name: e.last_name }
            adminsArray.push(adm)
        })
        res.render("generateAdmins", { adminsArray })
    } catch (error) {
        res.render("login")
    }
})

router.get('/libraryOrders', authMiddleware('admin'), async (req, res) => {
    try {
        res.render("libraryOrders")
    } catch (error) {
        res.render("login")
    }
})

router.get('/checkEmail', async (req, res) => {
    try {
        res.render("checkEmailRestore")
    } catch (error) {
        res.render("login")
    }
})

router.get('/restoreCredential/:token', async (req, res) => {
    const { token } = req.params
    const validate = jwtValidation(token)
    const name = validate.first_name
    const email = validate.email
    try {
        res.render("restorePassword", { name, email })
    } catch (error) {
        res.render("login")
    }
})

router.get('/multer', async (req, res) => {
    try {
        res.render("multer")
    } catch (error) {
        res.render("login")
    }
})

export default router