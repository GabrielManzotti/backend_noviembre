import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const mongo_uri = process.env.URI

mongoose.connect(mongo_uri)
    .then(() => console.log("conectado a DB"))
    .catch((error) => logger.error(error))