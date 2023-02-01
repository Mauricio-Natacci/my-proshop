import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken'
import { type Response } from 'express'
import { type User, UserModel } from '../models/userModel'

// @desc  Auth user & get token
// @route POST /api/users/login
// @access Public
export const login = asyncHandler(async (req: any, res: Response) => {
  const user = await getExistingUser(req, res)

  await checkIfPasswordIsCorrect(user, req, res)

  res.json(buildUserData(user))
})

const checkIfPasswordIsCorrect = async (
  user: any,
  req: any,
  res: Response<any, Record<string, any>>
) => {
  const isPasswordMatch = await user.matchPassword(req.body.password)
  if (!isPasswordMatch) {
    res.status(401)
    throw new Error('Invalid email or password')
  }
}

const getExistingUser = async (
  req: any,
  res: Response<any, Record<string, any>>
) => {
  const user = await UserModel.findOne({ email: req.body.email })
  if (user == null) {
    res.status(401)
    // TODO: research about error handling with custom Error classes
    throw new Error('Invalid email or password')
  }
  return user
}

// @desc  Get user profile
// @route POST /api/users/profile
// @access Private
export const getUserProfile = asyncHandler(async (req: any, res: Response) => {
  const user = await UserModel.findById(req.user._id)

  if (user != null) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc  Register a new user
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(async (req: any, res: Response) => {
  const { name, email, password } = req.body

  const userExists = await UserModel.findOne({ email })

  if (userExists != null) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await UserModel.create({
    name,
    email,
    password
  })

  res.status(201).json(buildUserData(user))
})

// TODO: where's the User type?
const buildUserData = (user: User) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id)
  }
}
