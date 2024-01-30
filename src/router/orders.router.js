import { Router } from 'express'
import obj from '../controllers/orders.controllers.js'

const router = Router()

router.post('/ticket', obj.createOrder)
router.get('/', obj.getAllOrders)
router.put('/:cid/purchase', obj.purchaseCart)
router.get('/checkStock/:cid', obj.checkStock)
router.get('/stadistics/totalAmountOrders/since/:sin/to/:to', obj.totalAmountOrders)
router.get('/stadistics/ordersByCustomer/since/:sin/to/:to/id/:id', obj.ordersByCustomer)

export default router
