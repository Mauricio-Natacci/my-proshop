import express from 'express'
import 'reflect-metadata'
import cookieParser from 'cookie-parser'
import { resolvers } from './resolvers'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault
} from 'apollo-server-core'
import { connectToMongo } from './utils/mongo'
import { config } from '../config'
import { graphqlHTTP } from 'express-graphql'

async function bootstrap() {
  // Build the schema

  const schema = await buildSchema({
    resolvers
  })

  // Init express
  const app = express()

  app.use(cookieParser())

  // Create the apollo server
  const server = new ApolloServer({
    schema,
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
