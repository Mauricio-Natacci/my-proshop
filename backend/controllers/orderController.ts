import { type Request, type Response } from 'express'
import asyncHandler from 'express-async-handler'
import { NotFoundError } from '../errors/NotFoundError'
import Order from '../models/orderModel'

export const addOrderItems = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderItems, shippingAddress, itemsPrice, totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new NotFoundError('No order items')
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        itemsPrice,
        totalPrice
      })

      const createdOrder = await order.save()

      res.status(201).json(createdOrder)
    }
  }
)

export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    )

    if (order != null) {
      res.json(order)
    } else {
      res.status(404)
      throw new NotFoundError('Order not found')
    }
  }
)

export const updateOrderToDelivered = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id)

    if (order != null) {
      order.isDelivered = true
      order.status = 'fulfilled'

      const updatedOrder = await order.save()

      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new NotFoundError('Order not found')
    }
  }
)

export const orderCancelled = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id)

    if (order != null) {
      order.isDelivered = false
      order.status = 'cancelled'

      const updatedOrder = await order.save()

      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new NotFoundError('Order not found')
    }
  }
)

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({ user: req.user._id })

  res.json(orders)
})

export const getAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await Order.find({}).populate('user', 'id name')

    res.json(orders)
  }
)
