import { Router } from 'express'
import { cartsManager } from '../dao/managers/cartsManager.js'
import { cartsModel } from '../db/models/cart.models.js'
import obj from '../controllers/cart.controllers.js'
const router = Router()

router.post('/', obj.createCart)
router.get('/', obj.findAllCarts)
router.get('/:cid', obj.findCartById)
router.post('/:cid/product/:pid', obj.addInCartAProduct)
router.put('/:cid/product/:pid', obj.updateInCartAProduct)
router.delete('/delete/:cartId', obj.deleteCart)

export default router