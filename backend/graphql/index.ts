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
import { type User, UserModel } from '../database/models/user.model'

async function bootstrap() {
  const schema = await buildSchema({
    resolvers,
    authChecker
  })

  const app = express()

  app.use(cookieParser())

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

  server.applyMiddleware({
    app,
    cors: {
      origin: 'http://localhost:3000',
      credentials: true
    }
  })

  const port = config.portGraphql

  app.listen({ port }, () => {
    console.log(`App is listening on port ${port}!`)
  })
  connectToMongo()
}

bootstrap()
