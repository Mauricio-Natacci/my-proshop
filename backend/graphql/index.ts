import 'reflect-metadata'
import express from 'express'
import cookieParser from 'cookie-parser'
import { resolvers } from './resolvers'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import { connectToMongo } from './utils/mongo'
import { authChecker } from './utils/authChecker'
import { type Context } from './types/context.type'
import { config } from '../config'
import { verifyJwt } from './utils/jwt'
import { type User, UserModel } from './schema/user.schema'

async function bootstrap() {
  // Build the schema

  const schema = await buildSchema({
    resolvers,
    authChecker
  })

  // Init express
  const app = express()

  app.use(cookieParser())

  // Create the apollo server
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
    playground: true
  })

  await server.start()
  // apply middleware to server

  server.applyMiddleware({ app })

  // app.listen on express server
  app.listen({ port: config.port }, () => {
    console.log(`App is listening on port ${config.port}!`)
  })
  connectToMongo()
}

bootstrap()
