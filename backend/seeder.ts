import dotenv from 'dotenv'
import users from './data/users'
import products from './data/products'
import { UserModel } from './models/userModel'
import Product from './models/productModel'
import Order from './models/orderModel'
import connectDB from './db/connectDb'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await UserModel.deleteMany()

    const createdUsers = await UserModel.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}
const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await UserModel.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
