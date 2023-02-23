import { type MiddlewareFn } from 'type-graphql'
import { type adminDecoratorContext } from '../types/adminDecorator.type'

export const isAdmin: MiddlewareFn<adminDecoratorContext> = async (
  { context },
  next
) => {
  if (!context.user?.isAdmin) {
    throw new Error('Not Authorized')
  }
  return await next()
}
