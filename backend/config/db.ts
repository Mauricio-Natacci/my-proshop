import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

let mongoURI: string
if (process.env.MONGO_URI) {
  mongoURI = process.env.MONGO_URI
} else {
  throw new Error("WHATEVER environment variable is not set")
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}
mongoose.set('strictQuery', true)

export default connectDB
