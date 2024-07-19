import mongoose from 'mongoose'
import { config } from './config'

export const connectDatabase = async () => {
  mongoose.connection.on('close', () => {
    console.log('Database connection was closed!')
  })

  mongoose.set('debug', true);

  mongoose.connect(config.MONGODB_URI, {
    dbName: "bank",
    connectTimeoutMS: 20000
  })
    .then(() => console.log('MongoDB connected'))
    .catch((err: any) => console.error('MongoDB connection error:', err))
}
