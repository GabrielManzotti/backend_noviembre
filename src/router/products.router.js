import { Router } from 'express'
import { productsManager } from '../dao/managers/productsManager.js'
import { authMiddleware } from "../midldlewares/auth.middleware.js";
import obj from '../controllers/products.controller.js'
import { generateArrayProduct } from '../faker.js';
import { errorMiddleware } from '../errors/error.middleware.js';

const router = Router()



router.post('/', authMiddleware('admin'), obj.createProduct)
router.get('/', obj.findAllProducts)
router.get('/category/:category/price/:price', obj.findProductsByCategoryAndPrice)
router.get('/price/:price', obj.findProductByPrice)
router.get('/:idProduct', obj.findProductById)
router.get('/category/:category', obj.findProductByCategory)
router.put('/update/:idProduct', authMiddleware('admin'), obj.updateProduct)
router.delete('/delete/:idProduct', authMiddleware('admin'), obj.deleteProduct)

// mocking
router.get('/mocking/mockingProducts', (req, res) => {
    const products = generateArrayProduct(100)
    res.json(products)
})

export default router