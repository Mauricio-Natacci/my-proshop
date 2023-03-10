import mongoose from 'mongoose'
import { config } from '../../config'

export async function connectToMongo() {
  try {
    await mongoose.connect(config.mongoURI)
    console.log('Connected to Database')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

mongoose.set('strictQuery', true)
