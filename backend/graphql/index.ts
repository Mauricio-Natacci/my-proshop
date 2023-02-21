import 'reflect-metadata'
import express from 'express'
import cookieParser from 'cookie-parser'
import { resolvers } from './resolvers'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault
} from 'apollo-server-core'
import { connectToMongo } from './utils/mongo'
import { graphqlHTTP } from 'express-graphql'
import authChecker from './utils/authChecker'
import type Context from './types/context.type'
import { config } from '../config'

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
    context: (ctx: Context) => {
      const context = ctx

      if (ctx.req.cookies.accessToken) {
        const user = ctx.req.cookies.accessToken
        context.user = user
      }
      return context
    },
    plugins: [
      config.shouldServeReactApp
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground()
    ]
  })

  await server.start()
  // apply middleware to server

  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true
    })
  )
  // app.listen on express server
  app.listen({ port: config.port }, () => {
    console.log(`App is listening on port ${config.port}!`)
  })
  connectToMongo()
}

bootstrap()
