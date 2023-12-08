import { Router } from 'express'
import { transporter } from '../nodemailer.js'
const router = Router()

router.get("/", async (req, res) => {
    const options = {
        from: 'manzotti.gabriel@gmail.com',
        to: 'gabriel.manzotti@hotmail.com',
        subject: 'Primer email',
        text: 'Primer email enviado con nodemailer'
    }
    await transporter.sendMail(options);
    res.send("Enviando email")
})

router.post('/', async (req, res) => {
    const { first_name, last_name, email } = req.body
    const options = {
        from: 'manzotti.gabriel@gmail.com',
        to: email,
        subject: 'Bienvenido',
        text: `Registro existoso. Bienvenido ${first_name} ${last_name} `
    }
    await transporter.sendMail(options);
    res.send("Enviando email")
})

export default router