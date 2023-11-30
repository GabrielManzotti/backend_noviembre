import { dirname } from 'path'
import { fileURLToPath } from 'url'
export const __dirname = dirname(fileURLToPath(import.meta.url))
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import config from './config.js'
import dotenv from 'dotenv'

const JWT_SECRET = config.JWT_SECRET

export const hashData = async (data) => {
    const hash = await bcrypt.hash(data, 10)
    return hash
}

export const compareData = async (data, hashData) => {
    return bcrypt.compare(data, hashData)
}

export const generateToken = (user) => {
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: 300 })
    return token;
}