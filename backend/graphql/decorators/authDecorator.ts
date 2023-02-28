import { createMethodDecorator } from 'type-graphql'
import { type adminDecoratorContext } from '../types/adminDecorator.type'

export function IsLoggedIn() {
  return createMethodDecorator<adminDecoratorContext>(
    async ({ context }, next) => {
      if (!context.user) {
        throw new Error('Not Authorized')
      }
      return await next()
    }
  )
}
