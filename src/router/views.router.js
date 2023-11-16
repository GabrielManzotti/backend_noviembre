import { Router } from "express";
import { productsManager } from "../dao/managers/productsManager.js";

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
    res.render("error")
})

router.get("/github", (req, res) => {
    res.render("github")
})
export default router