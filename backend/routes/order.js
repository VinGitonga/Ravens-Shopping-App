import express from 'express'
const router = express.Router()
import {
    addOrderItems,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid,
    getMyOrders,
    getOrders
} from '../controllers/order.js'
import {
    protect,admin
} from '../middleware/auth.js'

router.route('/')
   .post(protect,addOrderItems)
   .get(protect, admin, getOrders)

router.route('/myorders')
   .get(protect, getMyOrders)

router.route('/:id')
  .get(protect, getOrderById)

router.route('/:id/pay')
  .put(protect, updateOrderToPaid)

router.route('/:id/deliver')
   .put(protect, admin, updateOrderToDelivered)

export default router
