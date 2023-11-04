import { dirname } from 'path'
import { fileURLToPath } from 'url'
export const __dirname = dirname(fileURLToPath(import.meta.url))
import bcrypt from 'bcrypt'

export const hashData = async (data) => {
    const hash = await bcrypt.hash(data, 10)
    return hash
}

export const compareData = async (data, hashData) => {
    return bcrypt.compare(data, hashData)
}