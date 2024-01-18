import supertest from "supertest";
import { expect } from "chai";
import { productsManager } from "../src/dao/managers/productsManager.js";
import { usersManager } from "../src/dao/managers/usersManager.js";
import './db.js'

const requester = supertest("http://localhost:8080")
let id = ""

describe("products endpoints", () => {
    describe("POST /api/products", () => {
        it("should create a product with owner property is true because it was created by an admin role", async () => {
            const obj = {
                title: "Product supertest 5",
                description: "a product created by supertest 5",
                code: "abcSupertest5",
                price: 200,
                status: "vig",
                stock: 2000,
                category: "test category",
                thumbnail: "none",
                owner: "admin"
            }
            const response = await requester.post("/api/products").send(obj)
            expect(response._body.product.owner).to.be.equal("admin")
            id = response._body.product._id
            const deleteOne = await productsManager.deleteOne(id)
        })
    })

    describe("UPDATE /api/products", () => {
        it("should update a product", async () => {
            const obj = {
                status: "not valid",
            }
            let idProduct = "658de3145bf73972c0e5d0a7"
            const response = await requester.put("/api/products/update/" + idProduct).send(obj)
            expect(response._body.Product.status).to.be.equal("not valid")
        })
    })

    describe("UPDATE /api/products/price", () => {
        it("should get the products with price greater than 200", async () => {
            const price = 200
            let idProduct = "658de9d51b7f8ae564efa540"
            const deleteOne = await productsManager.findById(idProduct)
            const response = await requester.get("/api/products/price/" + price)
            expect(response._body.Products.results).to.be.an("array")
        })
    })
})

describe("products endpoints", () => {
    describe("POST /api/sessions/signup", () => {
        it("should create an user", async () => {
            const obj = {
                first_name: "Prueba",
                last_name: "Supertest",
                email: "mail.supertest@mail.com",
                age: 35,
                password: "123456",
            }
            const response = await requester.post("/api/sessions/signup").send(obj)
            const checkByEmail = await requester.get("/api/users/find/findByEmail/" + obj.email)
            expect(checkByEmail._body.user.email).to.be.equal(obj.email)
            const deleteOne = await usersManager.deleteOne(checkByEmail._body.user._id)
        })
    })
    describe("PUT /api/users/updateRole", () => {
        it("should update the role of a user searching by id", async () => {
            const user = {
                first_name: "Prueba",
                last_name: "Supertest",
                email: "mail.supertest@mail.com",
                age: 35,
                password: "123456",
            }
            const responseCreateUser = await requester.post("/api/sessions/signup").send(user)
            const checkByEmail = await requester.get("/api/users/find/findByEmail/" + user.email)
            const obj = {
                role: "admin",
                userId: checkByEmail._body.user._id
            }
            const response = await requester.put("/api/users/updateRole").send(obj)
            expect(response._body.message).to.be.equal(`The role has been updated for the ${checkByEmail._body.user._id} user`)
            const deleteOne = await usersManager.deleteOne(checkByEmail._body.user._id)
        })
    })
    describe("DELETE /api/users/delete", () => {
        it("should deslete a user searching by id", async () => {
            const user = {
                first_name: "Prueba",
                last_name: "Supertest",
                email: "mail.supertest@mail.com",
                age: 35,
                password: "123456",
            }
            const responseCreateUser = await requester.post("/api/sessions/signup").send(user)
            const checkByEmail = await requester.get("/api/users/find/findByEmail/" + user.email)
            const deleteOne = await requester.delete("/api/users/delete/" + checkByEmail._body.user._id)
            expect(deleteOne._body.message).to.be.equal("User deleted")
        })
    })
})

describe("carts endpoints", () => {
    describe("POST /api/:cid/products/:pid", () => {
        it("should create a cart", async () => {
            const createCart = await requester.post("/api/cart")
            expect(createCart._body.message).to.be.equal("cart created")
            const deleteCart = await requester.delete("/api/cart/delete/" + createCart._body.cart._id)
        })
    })
    describe("DELETE /api/cart/:cid", () => {
        it("should add a product in cart", async () => {
            const createCart = await requester.post("/api/cart")
            const deleteCart = await requester.delete("/api/cart/delete/" + createCart._body.cart._id)
            expect(deleteCart._body.message).to.be.equal("Cart deleted")
        })
    })
    describe("GET /api/cart/:cid", () => {
        it("should add a product in cart", async () => {
            const createCart = await requester.post("/api/cart")
            const findById = await requester.get("/api/cart/" + createCart._body.cart._id)
            expect(findById._body.message).to.be.equal("Cart")
        })
    })
})

