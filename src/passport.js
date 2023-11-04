import passport from "passport";
import { usersManager } from "./dao/managers/usersManager.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { hashData, compareData } from "./utils.js";

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
        const hashedPassword = await hashData(password)
        const createdUser = await usersManager.createOne({ ...req.body, password: hashedPassword })
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
        done(null, userDB)
    } catch (error) {
        done(error)
    }
}))

// GITHUB
passport.use("github", new GithubStrategy({
    clientID: "Iv1.6fbf244b533585c0",
    clientSecret: "6ee239ffd8544aa9a6e2ace41770746c5093b4a8",
    callbackURL: "http://localhost:8080/api/users/github"
}, async (accesToken, refreshToken, profile, done) => {
    try {
        const userDB = await usersManager.findByEmail(profile.emails[0].value)
        //login
        if (userDB) {
            if (userDB.from_github) {
                return done(null, userDB)
            } else {
                return done(null, false)
            }
        }
        // signup
        // splite del campo displayName (viene first_name y last_name en el mismo campo desde github)
        let splitString = profile.displayName.split(" ");
        const newUser = {
            first_name: splitString[0],
            last_name: splitString[1],
            email: profile.emails[0].value,
            password: "N/A",
            from_github: true
        }
        const createdUser = await usersManager.createOne(newUser)
        done(null, createdUser)
    } catch (error) {
        done(error)
    }
}))

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