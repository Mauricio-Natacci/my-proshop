import { Response } from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel";

// TODO: research about jsdoc
/**
 * @description Create new order
 * @route POST /api/orders
 * @access Private
 */
export const addOrderItems = asyncHandler(async (req: any, res: Response) => {
  const { orderItems, shippingAddress, itemsPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      itemsPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc  GET order by ID
// @route POST /api/orders/:id
// @access Private
export const getOrderById = asyncHandler(async (req: any, res: Response) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc  Update order to delivered
// @route POST /api/orders/:id/delivered
// @access Private/admin
export const updateOrderToDelivered = asyncHandler(
  async (req: any, res: Response) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.status = "fulfilled";

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  }
);

// @desc  Update order to cancelled
// @route POST /api/orders/:id/cancelled
// @access Private/admin
export const orderCancelled = asyncHandler(async (req: any, res: Response) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = false;
    order.status = "cancelled";

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc  GET logged in user orders
// @route POST /api/orders/myorders
// @access Private
export const getMyOrders = asyncHandler(async (req: any, res: Response) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

// @desc  GET all orders
// @route POST /api/orders/allorders
// @access Private/admin
export const getAllOrders = asyncHandler(async (req: any, res: Response) => {
  const orders = await Order.find({}).populate("user", "id name");

  res.json(orders);
});

// TODO: boyscout rule: always leave the camp-ground cleaner than you found it
