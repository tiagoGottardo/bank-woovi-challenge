import mongoose, { Document, Model, Schema, Types } from 'mongoose'

export interface Transaction extends Document {
  _id: string,
  amount_in_cents: number,
  createdAt: Date,
  sender_account: Types.ObjectId,
  receiver_account: Types.ObjectId,
}

export interface TransactionDocument extends Transaction { }

const TransactionSchema = new Schema<Transaction>({
  _id: { type: String, required: true },
  amount_in_cents: { type: Number, require: true },
  sender_account: { type: Schema.Types.ObjectId, ref: 'Account' },
  receiver_account: { type: Schema.Types.ObjectId, ref: 'Account' },
}, {
  collection: 'Transaction',
  timestamps: {
    createdAt: true
  }
})

export const TransactionModel: Model<Transaction> = mongoose.model<Transaction>('Transaction', TransactionSchema)
