import { Router } from "express";
import { authMiddleware } from "../midldlewares/auth.middleware.js";
import obj from "../controllers/users.controllers.js";
import { usersManager } from "../dao/managers/usersManager.js";
import multer from "multer";

const router = Router();

router.delete('/delete/:idUser', obj.deleteAUser)
router.get('/count/countByRole', obj.countUsersByRoleController)
router.get('/count/countAll', obj.countUsersController)
router.put('/updateRole', obj.updateRoleController)
router.get('/:idUser', authMiddleware('admin'), obj.findUserById)
router.get('/admins/getAdmins', obj.getAdminsUsers)
router.get('/find/findByEmail/:email', obj.findByEmail)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder
        if (file.fieldname === 'profileImage') {
            folder = 'profiles'
        } else if (file.fieldname === 'productImage') {
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
const upload = multer({ storage })

router.post('/:uid/documents', upload.single("documents"), async (req, res) => {
    try {
        let uid = req.params.uid
        const userDb = await usersManager.findById(uid)
        if (userDb) {
            userDb.documents = [
                ...userDb.documents,
                ...[{ name: req.file.filename, reference: req.file.path }],
            ]
            await userDb.save()
            return res.status(200).json({ message: "The file has been udpload" })
        }
        else {
            return res.status(200).json({ message: "user not found" })
        }
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
})

router.post('/:uid/profileImage', upload.single("profileImage"), async (req, res) => {
    try {
        let uid = req.params.uid
        const userDb = await usersManager.findById(uid)
        if (userDb) {
            userDb.documents = [
                ...userDb.documents,
                ...[{ name: req.file.filename, reference: req.file.path }],
            ]
            await userDb.save()
            return res.status(200).json({ message: "The file has been udpload" })
        }
        else {
            return res.status(200).json({ message: "user not found" })
        }
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
})

router.post('/:uid/productImage', upload.single("productImage"), async (req, res) => {
    try {
        let uid = req.params.uid
        const userDb = await usersManager.findById(uid)
        if (userDb) {
            userDb.documents = [
                ...userDb.documents,
                ...[{ name: req.file.filename, reference: req.file.path }],
            ]
            await userDb.save()
            return res.status(200).json({ message: "The file has been udpload" })
        }
        else {
            return res.status(200).json({ message: "user not found" })
        }
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
})


export default router

