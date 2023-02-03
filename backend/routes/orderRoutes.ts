import express from 'express'
import {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  getOrderById,
  orderCancelled,
  updateOrderToDelivered
} from '../controllers/orderController'
import { requireUser } from '../middleware/userMiddleware'
import { requireAdmin } from '../middleware/adminMiddleware'

const router = express.Router()

router.route('/').post(requireUser, addOrderItems)
router.route('/my-orders').get(requireUser, getMyOrders)
router.route('/all-orders').get(requireUser, requireAdmin, getAllOrders)
router.route('/:id').get(requireUser, getOrderById)
router
  .route('/:id/deliver')
  .put(requireUser, requireAdmin, updateOrderToDelivered)
router.route('/:id/cancelled').put(requireUser, requireAdmin, orderCancelled)

export default router
