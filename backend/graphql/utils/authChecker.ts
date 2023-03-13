import { AuthChecker } from 'type-graphql'
import { Context } from '../types/context.type'

export const authChecker: AuthChecker<Context> = ({
  root,
  args,
  context,
  info
}) => {
  return !!context.user
}
