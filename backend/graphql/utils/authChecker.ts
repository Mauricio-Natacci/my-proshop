import { type AuthChecker } from 'type-graphql'
import type Context from '../types/context.type'

const authChecker: AuthChecker<Context> = ({ root, args, context, info }) => {
  return !!context.user
}

export default authChecker
