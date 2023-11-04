import mongoose from "mongoose";


const URI = "mongodb+srv://manzottigabriel:Gabriel11@cluster0.4qrmhhc.mongodb.net/productsv1?retryWrites=true&w=majority"


mongoose.connect(URI)
    .then(() => console.log("conectado a DB"))
    .catch((error) => console.log(error))

