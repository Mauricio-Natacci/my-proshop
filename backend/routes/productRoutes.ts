import express from 'express'
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct
} from '../controllers/productController'
import { requireUser } from '../middleware/userMiddleware'
import { requireAdmin } from '../middleware/adminMiddleware'
const router = express.Router()

router
  .route('/')
  .get(getProducts)
  .post(requireUser, requireAdmin, createProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(requireUser, requireAdmin, deleteProduct)
  .put(requireUser, requireAdmin, updateProduct)

export default router
