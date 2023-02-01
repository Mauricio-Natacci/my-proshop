import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export type User = {
  _id: string
  name: string
  email: string
  password: string
  isAdmin: boolean
}

export type UserDocument = mongoose.Document &
  User & {
    matchPassword: (enteredPassword: string) => Promise<boolean>
  }

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

export const UserModel = mongoose.model('User', userSchema)
