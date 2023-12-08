import { Router } from "express";
import { usersManager } from "../dao/managers/usersManager.js";
import { compareData, hashData } from "../utils.js"
import { authMiddleware } from "../midldlewares/auth.middleware.js";
import obj from "../controllers/users.controllers.js";
import passport from "passport";

const router = Router();

// //passport
// router.post("/signup", passport.authenticate('signup', { successRedirect: "/api", failureRedirect: "/api/error" }))

// router.post("/login", passport.authenticate("login", { successRedirect: "/api", failureRedirect: "/api/error" }))

// router.get("/logout", (req, res) => {
//     req.session.destroy(() => {
//         res.redirect("/api/login")
//     })
// })

// //github
// router.get('/auth/github',
//     passport.authenticate('github', { scope: ['user:email'] }));

// router.get('/github',
//     passport.authenticate('github', { failureRedirect: '/api/error', successRedirect: "/api" })
// );

router.delete('/delete/:idUser', obj.deleteAUser)
router.get('/count/countByRole', obj.countUsersByRoleController)
router.get('/count/countAll', obj.countUsersController)
router.put('/updateRole', obj.updateRoleController)
router.get('/:idUser', authMiddleware('admin'), obj.findUserById)

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