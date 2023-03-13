/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { OrderModel } from '../../models/order.model'
import { ProductModel } from '../../models/product.model'
import { NotFoundError } from '../errors/notFoundError'
import { CreateOrderInput } from '../inputs/order.input'
import { Context } from '../types/context.type'
import { Order } from '../types/order.type'

export class CreateOrderUseCase {
  async execute(input: CreateOrderInput, context: Context): Promise<Order> {
    const user = context.user!

    const products = await ProductModel.find({
      productIds: { $in: input.items.map((item) => item.productId) }
    })

    const productsNotFound = input.items.filter(
      (item) =>
        !products.find((product) => product._id.toString() === item.productId)
    )

    if (productsNotFound.length > 0) {
      throw new NotFoundError(
        `Products not found: ${productsNotFound.map((item) => item.productId)}`
      )
    }

    const orderItems = input.items.map((item) => {
      const product = products.find(
        (product) => product._id.toString() === item.productId
      )

      return {
        productId: product!._id,
        price: product!.price,
        quantity: item.quantity
      }
    })

    const totalPrice = Number(
      orderItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2)
    )
    const shippingAddress = input.shippingAddress

    const order = new OrderModel({
      buyer: user._id,
      orderItems,
      shippingAddress,
      totalPrice
    })

    return await order.save()
  }
}
