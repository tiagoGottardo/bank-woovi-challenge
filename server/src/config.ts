import dotenv from 'dotenv'
dotenv.config()

export const config = {
  PORT: process.env.PORT || 3001,
  MONGODB_URI: process.env.MONGODB_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string || 'woovi-secret',
  NODE_ENV: process.env.NODE_ENV,
}
