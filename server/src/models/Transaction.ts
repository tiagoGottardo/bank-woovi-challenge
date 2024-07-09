import mongoose, { Document, Model, Schema } from 'mongoose';

interface ITransaction extends Document {
  _id: string,
  type: string,
  amount_in_cents: number,
  timestamp: Date,
  description: string,
  sender_account_id: string,
  receiver_account_id: string,
}

const accountSchema = new Schema<ITransaction>({
  _id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  amount_in_cents: { type: Number, require: true },
  timestamp: { type: Date, default: Date.now(), require: true },
  description: { type: String, default: '' },
  sender_account_id: { type: String, require: true },
  receiver_account_id: { type: String, require: true },
});

const Transaction: Model<ITransaction> = mongoose.model<ITransaction>('Transaction', accountSchema);

export default Transaction;
