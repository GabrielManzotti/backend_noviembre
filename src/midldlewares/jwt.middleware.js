import jwt from 'jsonwebtoken'

const JWT_SECRET = 'jwtSECRET';

export const jwtValidation = (req, res, next) => {
    try {
        const autHeader = req.get('Authorization')
        const token = autHeader.split(' ')[1]
        const responseToken = jwt.verify(token, JWT_SECRET)
        req.user = responseToken
        next()
    } catch (error) {
        res.status(500).json({ error })
    }
}