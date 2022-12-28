import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc  Create new order
// @route POST /api/orders
// @acess Private
const addOrderItems = asyncHandler(async (req, res) => {
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
const getOrderById = asyncHandler(async (req, res) => {
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
const updateOrderToDelivered = asyncHandler(async (req, res) => {
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
const orderCancelled = asyncHandler(async (req, res) => {
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

export { addOrderItems, getOrderById, updateOrderToDelivered, orderCancelled }
