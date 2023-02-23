import { createMethodDecorator } from 'type-graphql'
import { type adminDecoratorContext } from '../types/adminDecorator.type'

export function IsAdmin() {
  return createMethodDecorator<adminDecoratorContext>(
    async ({ context }, next) => {
      if (!context.user?.isAdmin) {
        throw new Error('Not Authorized')
      }
      return await next()
    }
  )
}
