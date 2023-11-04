import { Router } from "express";
import { productsManager } from "../dao/managers/productsManager.js";

const router = Router()

router.get("/", async (req, res) => {
    const results = await productsManager.find({})

    res.render('products', { results, first_name: req.user.first_name, email: req.user.email })
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
    console.log("req", req)
    const { first_name, email, isAdmin } = req.session
    res.render("home", { first_name, })
})

router.get("/error", (req, res) => {
    res.render("error")
})

router.get("/github", (req, res) => {
    res.render("github")
})
export default router