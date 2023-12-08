import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
import config from './config.js'
dotenv.config()

const user_gmail = config.GMAIL_USER
const password_gmail = config.GMAIL_PASSWORD

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: user_gmail,
        pass: password_gmail
    }
})