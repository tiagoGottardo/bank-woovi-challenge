import mongoose from 'mongoose'
import { config } from './config'

export const connectDatabase = async () => {
  mongoose.connection.on('close', () => {
    console.log('Database connection was closed!')
  })

  mongoose.connect(config.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err: any) => console.error('MongoDB connection error:', err))
}
