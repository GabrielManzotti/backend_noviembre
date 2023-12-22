import mongoose from "mongoose";
import dotenv from 'dotenv'
import { logger } from '../winston.js'


dotenv.config()
const mongo_uri = process.env.URI

mongoose.connect(mongo_uri)
    .then(() => logger.info("conectado a DB"))
    .catch((error) => logger.error(error))

