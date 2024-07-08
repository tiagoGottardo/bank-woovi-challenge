import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
