import 'reflect-metadata'
import express from 'express'
import cookieParser from 'cookie-parser'
import { resolvers } from './resolvers'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import { connectToMongo } from './utils/mongo'
import { authChecker } from './utils/authChecker'
import { Context } from './types/context.type'
import { config } from '../config'
import { verifyJwt } from './utils/jwt'
import { User, UserModel } from '../models/user.model'
import path from 'path'

async function bootstrap() {
  const schema = await buildSchema({
    resolvers,
    authChecker,
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

        context.user = user
      }

      return context
    },
    playground: config.playgroundEnabled,
  })

  await server.start()

  server.applyMiddleware({
    app,
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  })

  if (config.shouldServeReactApp) {
    app.use(express.static(path.join(__dirname, '../../../../frontend/build')))

    app.get('*', (_, res) => {
      res.sendFile(
        path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          'frontend',
          'build',
          'index.html',
        ),
      )
    })
  } else {
    app.get('/', (_, res) => {
      res.send('API is running...')
    })
  }

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const port = config.port

  app.listen({ port }, () => {
    console.log(`App is listening on port ${port}!`)
  })
  connectToMongo()
}

bootstrap()
