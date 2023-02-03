import express from 'express'
import {
  login,
  getUserProfile,
  registerUser
} from '../controllers/userController'
import { requireUser } from '../middleware/userMiddleware'

export const userRouter = express.Router()

userRouter.post('/login', login)
userRouter.post('/', registerUser)
userRouter.route('/profile').get(requireUser, getUserProfile)
