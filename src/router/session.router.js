import { Router } from "express";
import passport from "passport";
import { generateToken, hashData, compareData } from "../utils.js";
import { authMiddleware } from "../midldlewares/auth.middleware.js";
import obj from '../controllers/session.controllers.js'
import { usersManager } from "../dao/managers/usersManager.js";
import { usersModel } from "../db/models/users.models.js";

const router = Router()


router.put('/restorePassword/', async (req, res) => {
    const { password, email } = req.body

    try {
        const userDB = await usersManager.findByEmail(email)
        const comparePassword = await compareData(password, userDB.password)
        if (comparePassword === false) {
            const hashDataPassword = await hashData(password)
            userDB.password = hashDataPassword
            await userDB.save()
            res.status(200).json({ message: true })
        } else {
            res.status(200).json({ message: false })
        }

    } catch (error) {
        res.status(500).json({ error })
    }
})

//passport
router.post("/signup", passport.authenticate('signup', { successRedirect: "/api", failureMessage: true, failureFlash: true, failureRedirect: "/api" }))

router.post("/login", passport.authenticate("login", { successRedirect: "/api", failureRedirect: "/api/error" }))

router.get("/logout", async (req, res) => {
    const email = req.user.email
    const userDB = await usersManager.findByEmail(email)
    const timeTranscurred = Date.now();
    const today = new Date(timeTranscurred).toString("es-AR", { timeZone: "GMT-0300" });
    userDB.last_connection.date = today
    userDB.last_connection.action = "logout"
    await userDB.save()
    req.session.destroy(() => {
        res.redirect("/api/login")
    })
})

//github
router.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github',
    passport.authenticate('github', { failureRedirect: '/api', successRedirect: "/api" })
);



//google
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google',
    passport.authenticate('google', { failureRedirect: '/api/error', successRedirect: "/api" }))

//current
router.get('/current', authMiddleware('admin'), obj.sessionUser)

export default router