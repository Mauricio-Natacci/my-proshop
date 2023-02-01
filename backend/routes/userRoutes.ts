import express from 'express'
import {
  login,
  getUserProfile,
  registerUser
} from '../controllers/userController'
import { protect } from '../middleware/authMiddleware'

export const userRouter = express.Router()

userRouter.post('/login', login)
userRouter.post('/', registerUser)
userRouter.route('/profile').get(protect, getUserProfile)
