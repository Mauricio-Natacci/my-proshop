import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel'

// @desc  Create new order
// @route POST /api/orders
// @acess Private
const addOrderItems = asyncHandler(async (req: any, res: Response) => {
  const { orderItems, shippingAddress, itemsPrice, totalPrice } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      itemsPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

// @desc  GET order by ID
// @route POST /api/orders/:id
// @acess Private
const getOrderById = asyncHandler(async (req: any, res: Response) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc  Update order to delivered
// @route POST /api/orders/:id/delivered
// @acess Private/admin
const updateOrderToDelivered = asyncHandler(async (req: any, res: Response) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.status = 'fulfilled'

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc  Update order to cancelled
// @route POST /api/orders/:id/cancelled
// @acess Private/admin
const orderCancelled = asyncHandler(async (req: any, res: Response) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = false
    order.status = 'cancelled'

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc  GET logged in user orders
// @route POST /api/orders/myorders
// @acess Private
const getMyOrders = asyncHandler(async (req: any, res: Response) => {
  const orders = await Order.find({ user: req.user._id })

  res.json(orders)
})

// @desc  GET all orders
// @route POST /api/orders/allorders
// @acess Private/admin
const getAllOrders = asyncHandler(async (req: any, res: Response) => {
  const orders = await Order.find({}).populate('user', 'id name')

  res.json(orders)
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToDelivered,
  orderCancelled,
  getMyOrders,
  getAllOrders,
}
