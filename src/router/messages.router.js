import { Router } from 'express'
import { transporter } from '../nodemailer.js'
import { generateToken, jwtValidation } from '../utils.js'
const router = Router()

// router.get("/", async (req, res) => {
//     const options = {
//         from: 'manzotti.gabriel@gmail.com',
//         to: 'gabriel.manzotti@hotmail.com',
//         subject: 'Primer email',
//         text: 'Primer email enviado con nodemailer'
//     }
//     await transporter.sendMail(options);
//     res.send("Enviando email")
// })

router.post('/', async (req, res) => {
    const { first_name, email } = req.body
    const user = {
        first_name,
        email
    }
    const token = generateToken(user)
    // const validate = jwtValidation(token)
    const options = {
        from: 'manzotti.gabriel@gmail.com',
        to: email,
        subject: `Hi ${first_name}, restore your credentials`,
        html: `${first_name}!, copy and paste this url in your browser to restore the credential: <h3>http://localhost:8080/api/restoreCredential/${token}</h3>`
    }
    await transporter.sendMail(options);
})

export default router

