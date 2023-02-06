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

export const orderRoutes = express.Router()

orderRoutes.route('/').post(requireUser, addOrderItems)
orderRoutes.route('/my-orders').get(requireUser, getMyOrders)
orderRoutes.route('/all-orders').get(requireUser, requireAdmin, getAllOrders)
orderRoutes.route('/:id').get(requireUser, getOrderById)
orderRoutes
  .route('/:id/deliver')
  .put(requireUser, requireAdmin, updateOrderToDelivered)
orderRoutes
  .route('/:id/cancelled')
  .put(requireUser, requireAdmin, orderCancelled)
