import { Router } from "express";
import { usersManager } from "../dao/managers/usersManager.js";
import { compareData, hashData } from "../utils.js"
import { authMiddleware } from "../midldlewares/auth.middleware.js";
import obj from "../controllers/users.controllers.js";
import passport from "passport";

const router = Router();

router.delete('/delete/:idUser', obj.deleteAUser)
router.get('/count/countByRole', obj.countUsersByRoleController)
router.get('/count/countAll', obj.countUsersController)
router.put('/updateRole', obj.updateRoleController)
router.get('/:idUser', authMiddleware('admin'), obj.findUserById)
router.get('/admins/getAdmins', obj.getAdminsUsers)
router.get('/find/findByEmail/:email', obj.findByEmail)

export default router

