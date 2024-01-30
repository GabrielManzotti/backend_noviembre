import multer from "multer";
import { __dirname } from "../utils.js"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder
        if (File.fieldname === 'profileImage') {
            folder = 'profiles'
        } else if (File.fieldname === 'productImage') {
            folder = 'products'
        } else {
            folder = 'documents'
        }
        cb(null, `uploads${folder}`)
    },
    filename: function (req, file, cb) {
        const { uid } = req.params
        cb(null, uid + '-' + Date.now() + '-' + file.originalname)
    }
})

export const upload = multer({ storage })