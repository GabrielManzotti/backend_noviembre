import dotenv from 'dotenv'

dotenv.config()

const obj = {
    URI: process.env.URI,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    JWT_SECRET: process.env.JWT_SECRET,
    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    ENVIRONMENT: process.env.ENVIRONMENT
}

export default obj