import { Router } from 'express'
import { cartsManager } from '../dao/managers/cartsManager.js'
import { cartsModel } from '../db/models/cart.models.js'
import obj from '../controllers/cart.controllers.js'
import { errorMiddleware } from '../errors/error.middleware.js'

const router = Router()

router.post('/', obj.createCart)
router.get('/', obj.findAllCarts)
router.get('/:cid', errorMiddleware, obj.findCartById)
router.post('/:cid/product/:pid', obj.addInCartAProduct)
router.put('/:cid/product/:pid', obj.updateInCartAProduct)
router.delete('/delete/:cartId', obj.deleteCart)
router.delete('/:cid/product/:pid', obj.deleteAProductInCart)
router.delete('/resetCart/:cid', obj.resetProductsInCart)
router.delete('/delete/allProducts/:cid', obj.deleteAllProducts)

export default router