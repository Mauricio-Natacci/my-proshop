import express from 'express'
const router = express.Router()
import {
  login,
  getUserProfile,
  registerUser,
} from '../controllers/userController'
import { protect } from '../middleware/authMiddleware'

router.post('/login', login)
router.post('/', registerUser)
router.route('/profile').get(protect, getUserProfile)

export default router
