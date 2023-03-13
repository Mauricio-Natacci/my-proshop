import { resolvers } from './resolvers'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import { authChecker } from './utils/authChecker'
import { Context } from './types/context.type'
import { config } from '../config'
import { verifyJwt } from './utils/jwt'
import { User, UserModel } from '../models/user.model'
import { Express } from 'express'

export async function createGraphqlServer(app: Express): Promise<ApolloServer> {
  const schema = await buildSchema({
    resolvers,
    authChecker
  })

  const server = new ApolloServer({
    schema,
    context: async (ctx: Context) => {
      const context = ctx

      if (context.req.cookies.accessToken) {
        const decoded = verifyJwt<User>(context.req.cookies.accessToken)

        const user = await UserModel.findById(decoded)
          .select('-password')
          .lean()
        context.user = user
      }

      return context
    },
    playground: config.playgroundEnabled
  })

  await server.start()

  server.applyMiddleware({ app })

  return server
}
