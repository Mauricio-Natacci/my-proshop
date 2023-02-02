import { config } from '../config'
import mongoose from 'mongoose'

let mongoURI: string
if (config.mongoURI) {
  mongoURI = config.mongoURI
} else {
  throw new Error('mongoURI environment variable is not set')
}

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(mongoURI)

    console.log(`MongoDB Connected: ${connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}
mongoose.set('strictQuery', true)
