import User from '../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

interface userRequest {
  username: string,
  password: string
}

const JWT_SECRET = process.env.JWT_SECRET || ''

export default {
  Query: {
    me: async (_: any, __: any, { user }: { user: any }) => {
      return User.findOne({ username: user.username })
    },
  },
  Mutation: {
    login: async (_: any, { username, password }: userRequest) => {
      const user = await User.findOne({ username })
      if (!user) {
        throw new Error('User not found');
      }

      const valid = await bcrypt.compare(password, user.password)

      if (!valid) {
        throw new Error('Invalid password');
      }

      return jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' })
    },
    register: async (_: any, { username, password }: userRequest) => {
      if (await User.findOne({ username })) {
        throw new Error('User already exists')
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword })
      await user.save();
      return jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' })
    },
  },
}

