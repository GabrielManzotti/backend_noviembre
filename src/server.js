import express from 'express'
import productRouter from './router/products.router.js'
import cartRouter from './router/cart.router.js'
import { __dirname } from './utils.js'
import { engine } from 'express-handlebars';
import viewsRouter from './router/views.router.js'
import { Server } from 'socket.io';
import { productManager } from './dao/entities/script2doEntregable.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import usersRouter from "./router/users.router.js"
import MongoStore from 'connect-mongo';
import passport from 'passport';
import './passport.js'
import './db/config.js'

const app = express()

const secret = '123456'
app.use(cookieParser(secret))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public/'))

const URI = "mongodb+srv://manzottigabriel:Gabriel11@cluster0.4qrmhhc.mongodb.net/productsv1?retryWrites=true&w=majority"


//session 
app.use(session({
    secret: "SESSIONSECRETKEY",
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    store: new MongoStore({
        mongoUrl: URI
    })
}
))

//passport
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');


app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/users', usersRouter)
app.use('/api', viewsRouter)

const httpServer = app.listen(8080, () => {
    console.log('Escuchando al puerto 8080')
})

//websocket -server
const socketServer = new Server(httpServer)

const onConnection = async (socket) => {
    await getAllProductsHandler(socketServer, socket)
}

socketServer.on("connection", (socket) => {
    console.log("cliente conectado", socket.id);
    socket.on("getProducts", async () => {
        const products = await productManager.getProducts();
        socketServer.emit("updatedProducts", products);
    });
})


