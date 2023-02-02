import path from 'path'
import express from 'express'
import { config } from './config'
import { connectDB } from './db/connectDb'
import { errorHandler, notFound } from './middleware/errorMiddleware'
import productRoutes from './routes/productRoutes'
import { userRouter } from './routes/userRoutes'
import orderRoutes from './routes/orderRoutes'
import uploadRoutes from './routes/uploadRoutes'

const app = express()

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (config.shouldServeReactApp) {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (_, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', 'frontend', 'build', 'index.html')
    )
  })
} else {
  app.get('/', (_, res) => {
    res.send('API is running...')
  })
}

app.use(notFound)

app.use(errorHandler)
const PORT = config.port || 5000

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running in ${config.environment} mode on port ${PORT}`
      )
    })
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
