import { Router } from "express";
import { authMiddleware } from "../midldlewares/auth.middleware.js";
import obj from "../controllers/users.controllers.js";
import { upload } from "../midldlewares/multer.middleware.js";

// const documentPath = path.join(process.cwd(), 'uploads', 'documents')
// const requiredDocuments = [
//     "Identificacion.pdf",
//     "Comprobante.pdf",
//     "Estado de cuenta.pdf"
// ]
// const filesInDocument = fs.readdirSync(documentPath)

const router = Router();

router.delete('/delete/:idUser', obj.deleteAUser)
router.get('/count/countByRole', obj.countUsersByRoleController)
router.get('/count/countAll', obj.countUsersController)
router.put('/updateRole', obj.updateRoleController)
router.get('/:idUser', authMiddleware('admin'), obj.findUserById)
router.get('/admins/getAdmins', obj.getAdminsUsers)
router.get('/find/findByEmail/:email', obj.findByEmail)

// router.post('/:uid/documents', async () =>{
//     const {uid} = req.params
//     if(!req.body.multer){
//         req.body.multer = {}
//     }
//     req.body.multer.userId = uid
//     next()
// })

// upload.fields([
//     {name "profileImage", maxCount:1},
//     {name ""}

// ])

export default router

