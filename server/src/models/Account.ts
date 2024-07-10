import mongoose, { Document, Model, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

import bcrypt from 'bcryptjs'

export interface Account extends Document {
  _id: string
  name: string
  email: string
  cpf: string
  date_of_birth: Date
  account_key: string
  password: string
  balance_in_cents: number
}

export interface AccountDocument extends Account {
  hashPassword(password: string): Promise<string>
  authenticate(plainTextPassword: string): Promise<boolean>
}

const AccountSchema = new Schema<Account>({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cpf: { type: String, required: true, unique: true },
  date_of_birth: { type: Date, required: true },
  account_key: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  balance_in_cents: { type: Number, required: true, min: 0, default: 0 }
}, {
  collection: 'Account'
})

AccountSchema.pre<AccountDocument>('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    const hashedPassword = await this.hashPassword(this.password)
    this.password = hashedPassword
  }

  return next()
})

AccountSchema.methods = {
  hashPassword: async function(password: string) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword
  },

  authenticate: async function(plainTextPassword: string) {
    return await bcrypt.compare(plainTextPassword, this.password)
  },
}

export const AccountModel: Model<Account> = mongoose.model<Account>('Account', AccountSchema)
