import passport from "passport";
import { usersManager } from "./dao/managers/usersManager.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { hashData, compareData } from "./utils.js";
import { cartsManager } from "./dao/managers/cartsManager.js";
import { sendEmail } from "./utils.js";
import config from './config.js'
import dotenv from 'dotenv'
dotenv.config()
const github_client_id = config.GITHUB_CLIENT_ID
const github_client_secret = config.GITHUB_CLIENT_SECRET
const google_client_id = config.GOOGLE_CLIENT_ID
const google_client_secret = config.GOOGLE_CLIENT_SECRET
let subject = "Bienvenido"
let text = "Registro existoso. Bienvenido"

// LOCAL
passport.use("signup", new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const userDB = await usersManager.findByEmail(email)
        if (userDB) {
            return done(null, false)
        }
        const createdCart = await cartsManager.createOne()
        const hashedPassword = await hashData(password)
        const createdUser = await usersManager.createOne({ ...req.body, password: hashedPassword, cart: createdCart._id })
        await sendEmail(subject, email, req.body.first_name, req.body.last_name, text)
        const timeTranscurred = Date.now();
        const today = new Date(timeTranscurred).toString("es-AR", { timeZone: "GMT-0300" });
        userDB.last_connection.date = today
        userDB.last_connection.action = "login"
        await userDB.save()
        done(null, createdUser)
    } catch (error) {
        done(error)
    }
}))

passport.use("login", new LocalStrategy({
    usernameField: 'email',
}, async (email, password, done) => {
    try {
        const userDB = await usersManager.findByEmail(email)
        if (!userDB) {
            return done(null, false)
        }
        const comparePassword = await compareData(password, userDB.password)
        if (!comparePassword) {
            return done(null, false)
        }
        const timeTranscurred = Date.now();
        const today = new Date(timeTranscurred).toString("es-AR", { timeZone: "GMT-0300" });
        userDB.last_connection.date = today
        userDB.last_connection.action = "login"
        await userDB.save()
        done(null, userDB)
    } catch (error) {
        done(error)
    }
}))

// GITHUB
passport.use("github", new GithubStrategy({
    clientID: github_client_id,
    clientSecret: github_client_secret,
    callbackURL: "https://backendv1-eosin.vercel.app/api/sessions/github"
}, async (accesToken, refreshToken, profile, done) => {
    try {
        const userDB = await usersManager.findByEmail(profile._json.email)
        //login
        if (userDB) {
            if (userDB.from_github) {
                const timeTranscurred = Date.now();
                const today = new Date(timeTranscurred).toString("es-AR", { timeZone: "GMT-0300" });
                userDB.last_connection.date = today
                userDB.last_connection.action = "login"
                await userDB.save()
                return done(null, userDB)
            } else {
                return done(null, false)
            }
        }
        // signup (github no trae edad, por lo que por defecto graba 18 )
        const newUser = {
            first_name: profile._json.name.split(' ')[0],
            last_name: profile._json.name.split(' ')[1] || "",
            email: profile._json.email || profile.emails[0].value,
            age: "18",
            password: "N/A",
            from_github: true
        }
        const createdCart = await cartsManager.createOne()
        const createdUser = await usersManager.createOne({ ...newUser, cart: createdCart._id })
        await sendEmail(subject, email, req.body.first_name, req.body.last_name, text)
        const timeTranscurred = Date.now();
        const today = new Date(timeTranscurred).toString("es-AR", { timeZone: "GMT-0300" });
        userDB.last_connection.date = today
        userDB.last_connection.action = "login"
        await userDB.save()
        done(null, createdUser)
    } catch (error) {
        done(error)
    }
}))

// GOOGLE
passport.use('google', new GoogleStrategy({
    clientID: google_client_id,
    clientSecret: google_client_secret,
    callbackURL: "http://localhost:8080/api/sessions/google"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const userDB = await usersManager.findByEmail(profile._json.email)
        //login
        if (userDB) {
            if (userDB.from_google) {
                const timeTranscurred = Date.now();
                const today = new Date(timeTranscurred).toString("es-AR", { timeZone: "GMT-0300" });
                userDB.last_connection.date = today
                userDB.last_connection.action = "login"
                await userDB.save()
                return done(null, userDB)
            } else {
                return done(null, false)
            }
        }
        // signup (google no trae edad, por lo que por defecto graba 18)
        const newUser = {
            first_name: profile._json.name.split(' ')[0],
            last_name: profile._json.name.split(' ')[1] || "",
            email: profile._json.email || profile.emails[0].value,
            age: "18",
            password: "N/A",
            from_google: true
        }
        const createdCart = await cartsManager.createOne()
        const createdUser = await usersManager.createOne({ ...newUser, cart: createdCart._id })
        await sendEmail(subject, email, req.body.first_name, req.body.last_name, text)
        const timeTranscurred = Date.now();
        const today = new Date(timeTranscurred).toString("es-AR", { timeZone: "GMT-0300" });
        userDB.last_connection.date = today
        userDB.last_connection.action = "login"
        await userDB.save()
        done(null, createdUser)
    } catch (error) {
        done(error)
    }
})
)

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await usersManager.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
});