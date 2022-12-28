import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  getOrderById,
  orderCancelled,
  updateOrderToDelivered,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/allorders').get(protect, admin, getAllOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/:id/cancelled').put(protect, admin, orderCancelled)

export default router
