import { Router } from "express";
import passport from "passport";
import { generateToken } from "../utils.js";

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

router.get('/current', async (req, res) => {
    const currentUser = req.user
    console.log("log", currentUser);
    try {
        if (currentUser) {
            return res.status(200).json({ message: "Current user", User: currentUser })
        } else {
            return res.status(400).json({ message: "No user login" })
        }
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
})

export default router