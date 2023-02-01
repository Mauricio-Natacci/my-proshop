import express from 'express'
import {
  addOrderItems,
  getAllOrders,
  getMyOrders,
  getOrderById,
  orderCancelled,
  updateOrderToDelivered
} from '../controllers/orderController'
import { protect, admin } from '../middleware/authMiddleware'
const router = express.Router()

router.route('/').post(protect, addOrderItems)
// TODO: use kebab-case for the route
router.route('/myorders').get(protect, getMyOrders)
router.route('/allorders').get(protect, admin, getAllOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/:id/cancelled').put(protect, admin, orderCancelled)

export default router
