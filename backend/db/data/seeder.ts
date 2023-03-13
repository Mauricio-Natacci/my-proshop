// import { users } from './users'
// import { products } from './products'
// import { UserModel } from '../../models/user.model'
// import { ProductModel } from '../../models/product.model'
// import { OrderModel } from '../../models/order.model'
// import { connectDB } from '../connectDb'

// connectDB()

// const importData = async () => {
//   try {
//     await OrderModel.deleteMany()
//     await ProductModel.deleteMany()
//     await UserModel.deleteMany()

//     const createdUsers = await UserModel.insertMany(users)

//     const adminUser = createdUsers[0]._id

//     const sampleProducts = products.map((product) => {
//       return { ...product, user: adminUser }
//     })

//     await ProductModel.insertMany(sampleProducts)

//     console.log('Data Imported!')
//     process.exit()
//   } catch (error) {
//     console.error(`${error}`)
//     process.exit(1)
//   }
// }
// const destroyData = async () => {
//   try {
//     await OrderModel.deleteMany()
//     await ProductModel.deleteMany()
//     await UserModel.deleteMany()

//     console.log('Data Destroyed!')
//     process.exit()
//   } catch (error) {
//     console.error(`${error}`)
//     process.exit(1)
//   }
// }

// if (process.argv[2] === '-d') {
//   destroyData()
// } else {
//   importData()
// }
