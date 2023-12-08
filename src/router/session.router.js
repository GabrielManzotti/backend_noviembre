import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils.js";
import { authMiddleware } from "../midldlewares/auth.middleware.js";
import obj from '../controllers/session.controllers.js'

const router = Router()


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

//google
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google',
    passport.authenticate('google', { failureRedirect: '/api/error', successRedirect: "/api" }))

//current
router.get('/current', authMiddleware('admin'), obj.sessionUser)

export default router