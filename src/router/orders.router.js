import { Router } from 'express'
import obj from '../controllers/orders.controllers.js'

const router = Router()

router.post('/ticket', obj.createOrder)
router.get('/', obj.getAllOrders)
router.put('/:cid/purchase', obj.purchaseCart)
router.get('/checkStock/:cid', obj.checkStock)

export default router
