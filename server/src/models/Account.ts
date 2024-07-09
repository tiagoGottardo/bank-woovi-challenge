import mongoose, { Document, Model, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

interface IAccount extends Document {
  _id: string
  name: string
  email: string
  cpf: string
  date_of_birth: Date
  account_key: string
  password: string
  balance_in_cents: Number
}

const accountSchema = new Schema<IAccount>({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cpf: { type: String, required: true, unique: true },
  date_of_birth: { type: Date, required: true },
  account_key: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  balance_in_cents: { type: Number, required: true, min: 0, default: 0 }
})

const Account: Model<IAccount> = mongoose.model<IAccount>('Account', accountSchema)

export default Account
