import mongoose, { Document, Model, Schema, Types } from 'mongoose'

interface Transaction extends Document {
  _id: string,
  amount_in_cents: number,
  createdAt: Date,
  sender_account_id: Types.ObjectId,
  receiver_account_id: Types.ObjectId,
}

const TransactionSchema = new Schema<Transaction>({
  _id: { type: String, required: true },
  amount_in_cents: { type: Number, require: true },
  sender_account_id: { type: Schema.Types.ObjectId, ref: 'Account' },
  receiver_account_id: { type: Schema.Types.ObjectId, ref: 'Account' },
}, {
  collection: 'Transaction',
  timestamps: {
    createdAt: true
  }
})

const TransactionModel: Model<Transaction> = mongoose.model<Transaction>('Transaction', TransactionSchema)

export default TransactionModel
