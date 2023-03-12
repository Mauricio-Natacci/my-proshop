import asyncHandler from 'express-async-handler'
import { generateToken } from '../utils/generateToken'
import { Request, Response } from 'express'
import { User, UserModel } from '../models/userModel'
import { NotFoundError } from '../errors/NotFoundError'

export const login = asyncHandler(async (req: Request, res: Response) => {
  const user = await getExistingUser(req, res)

  await checkIfPasswordIsCorrect(user, req, res)

  res.json(buildUserData(user))
})

const checkIfPasswordIsCorrect = async (
  user: User,
  req: Request,
  res: Response
) => {
  const isPasswordMatch = await user.matchPassword(req.body.password)
  if (!isPasswordMatch) {
    res.status(401)
    throw new NotFoundError('Invalid email or password')
  }
}

const getExistingUser = async (req: Request, res: Response) => {
  const user = await UserModel.findOne({ email: req.body.email })
  if (user == null) {
    res.status(401)
    throw new NotFoundError('Invalid email or password')
  }
  return user
}

export const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
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
      throw new NotFoundError('User not found')
    }
  }
)

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    const userExists = await UserModel.findOne({ email })

    if (userExists != null) {
      res.status(400)
      throw new NotFoundError('User already exists')
    }

    const user = await UserModel.create({
      name,
      email,
      password
    })

    res.status(201).json(buildUserData(user))
  }
)

const buildUserData = (user: User) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id)
  }
}
