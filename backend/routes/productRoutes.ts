import express from 'express'
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct
  // createProduct
} from '../controllers/productController'
import { requireUser } from '../middleware/userMiddleware'
import { requireAdmin } from '../middleware/adminMiddleware'

export const productRoutes = express.Router()

productRoutes.route('/').get(getProducts)
// .post(requireUser, requireAdmin, createProduct)
productRoutes
  .route('/:id')
  .get(getProductById)
  .delete(requireUser, requireAdmin, deleteProduct)
  .put(requireUser, requireAdmin, updateProduct)
