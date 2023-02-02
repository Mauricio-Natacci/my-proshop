import { config } from '../config'
import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(config.mongoURI)

    console.log(`MongoDB Connected: ${connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}
mongoose.set('strictQuery', true)
