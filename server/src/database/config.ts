import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI || '')
  .then(() => console.log('MongoDB connected'))
  .catch((err: any) => console.error('MongoDB connection error:', err));
