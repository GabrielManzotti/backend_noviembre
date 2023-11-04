import { Router } from "express";
import { usersManager } from "../dao/managers/usersManager.js";
import { compareData, hashData } from "../utils.js"
import passport from "passport";

const router = Router();

//passport
router.post("/signup", passport.authenticate('signup', { successRedirect: "/api", failureRedirect: "/api/error" }))

router.post("/login", passport.authenticate("login", { successRedirect: "/api", failureRedirect: "/api/error" }))

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/api/login")
    })
})

//github
router.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github',
    passport.authenticate('github', { failureRedirect: '/api/error', successRedirect: "/api" })
);

router.delete('/delete/:idUser', async (req, res) => {
    const { idUser } = req.params
    try {
        const result = await usersManager.deleteOne(idUser)
        if (result === "User not found") {
            return res.status(400).json({ message: "user not found" })
        } else {
            return res.status(200).json({ message: "User deleted", User: result })
        }
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
})

// router.get("/github", (req, res) => {
//     res.redirect("/api/github")
// })


export default router

//--------------------------------------------LOGIN TRADICIONAL SIN PASSPORT-----------------------------

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body
//     const userDB = await usersManager.findByEmail(email)
//     //comapra email
//     if (!userDB) {
//         return res.json({ error: "Email or password don't match" })
//     }
//     const comparePassword = await compareData(password, userDB.password)
//     //compara password
//     if (!comparePassword) {
//         return res.json({ error: "Email or password don't match" })
//     }
//     req.session["email"] = email
//     req.session["first_name"] = userDB.first_name
//     req.session["isAdmin"] =
//         email === "adminCoder@coder.com" && password === "adminCod3r123" ? true : false
//     res.redirect("/api")
// })

// router.post("/signup", async (req, res) => {
//     const { password } = req.body
//     const hashedPassword = await hashData(password)
//     const createdUser = await usersManager.createOne({ ...req.body, password: hashedPassword })
//     res.status(200).json({ message: "User created", createdUser })
// })