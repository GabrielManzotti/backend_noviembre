import { dirname } from 'path'
import { fileURLToPath } from 'url'
export const __dirname = dirname(fileURLToPath(import.meta.url))
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import config from './config.js'
import dotenv from 'dotenv'
import { transporter } from './nodemailer.js'

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
    return token
}

export const jwtValidation = (token) => {
    const tokenValidate = jwt.verify(token, JWT_SECRET)
    return tokenValidate
}

export const generateUrl = (user) => {
    const url = jwt.sign(user, JWT_SECRET, { expiresIn: 100 })
    return url;
}

export const sendEmailRestoreCredential = async (obj) => {
    const options = {
        from: 'manzotti.gabriel@gmail.com',
        to: obj.email,
        subject: `Hi ${obj.first_name} restore your credentials`,
        text: `<button onclick="location.href='http://localhost:8080/api/restoreCredential'">RESTORE CREDENTIALS</button>`,
        html: `<button onclick="location.href='http://localhost:8080/api/restoreCredential'">RESTORE CREDENTIALS</button>`
    }

    await transporter.sendMail(options);
}

export const sendEmail = async (subject, email, first_name, last_name, text) => {
    const options = {
        from: 'manzotti.gabriel@gmail.com',
        to: email,
        subject: subject,
        text: text
    }
    await transporter.sendMail(options);

} 