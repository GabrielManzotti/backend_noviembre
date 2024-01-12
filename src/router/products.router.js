import { Router } from 'express'
import { productsManager } from '../dao/managers/productsManager.js'
import { authMiddleware, authMiddlewareTwoRoles } from "../midldlewares/auth.middleware.js";
import obj from '../controllers/products.controller.js'
import { generateArrayProduct } from '../faker.js';

const router = Router()
router.delete('/delete/:idProduct', authMiddlewareTwoRoles('admin', 'premium'), obj.deleteProduct)
router.post('/', authMiddleware('admin'), obj.createProduct)
router.get('/', obj.findAllProducts)
router.get('/category/:category/price/:price', obj.findProductsByCategoryAndPrice)
router.get('/price/:price', obj.findProductByPrice)
router.get('/:idProduct', obj.findProductById)
router.get('/category/:category', obj.findProductByCategory)
router.put('/update/:idProduct', authMiddleware('admin'), obj.updateProduct)

// mocking
router.get('/mocking/mockingProducts', (req, res) => {
    const products = generateArrayProduct(100)
    res.json(products)
})

export default router