import { Router } from 'express'
import { productsManager } from '../dao/managers/productsManager.js'
import { authMiddleware } from "../midldlewares/auth.middleware.js";
import obj from '../controllers/products.controller.js'

const router = Router()

router.post('/', authMiddleware('admin'), obj.createProduct)
router.get('/', obj.findAllProducts)
router.get('/category/:category/price/:price', obj.findProductsByCategoryAndPrice)
router.get('/price/:price', obj.findProductByPrice)
router.get('/:idProduct', obj.findProductById)
router.get('/category/:category', obj.findProductByCategory)
router.put('/update/:idProduct', authMiddleware('admin'), obj.updateProduct)
router.delete('/delete/:idProduct', authMiddleware('admin'), obj.deleteProduct)

export default router