/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { OrderModel } from '../../database/models/order.model'
import { ProductModel } from '../../database/models/product.model'
import { NotFoundError } from '../errors/notFoundError'
import { type CreateOrderInput } from '../inputs/order.input'
import { type Context } from '../types/context.type'
import { type Order } from '../types/order.type'

export class CreateOrderUseCase {
  async execute(input: CreateOrderInput, context: Context): Promise<Order> {
    const user = context.user

    if (!user) {
      throw new NotFoundError('User not found')
    }

    const _id = input.items.map((item) => item.productId)

    const products = await ProductModel.find({
      _id
    })

    if (products.length !== input.items.length) {
      throw new NotFoundError('Some products not found')
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

    const totalPrice = orderItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2)

    const order = new OrderModel({
      user: user._id,
      orderItems,
      shippingAddress: input.shippingAddress,
      totalPrice
    })

    return await order.save()
  }
}
