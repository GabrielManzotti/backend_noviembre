import { Router } from 'express'
import { transporter } from '../nodemailer.js'
import { generateToken, jwtValidation } from '../utils.js'
const router = Router()

router.post('/', async (req, res) => {
    const { first_name, email } = req.body
    const user = {
        first_name,
        email
    }
    const token = generateToken(user)
    const options = {
        from: 'manzotti.gabriel@gmail.com',
        to: email,
        subject: `Hi ${first_name}, restore your credentials`,
        html: `${first_name}!, copy and paste this url in your browser to restore the credential: <h3>http://localhost:8080/api/restoreCredential/${token}</h3>`
    }
    await transporter.sendMail(options);
})

export default router

