import { Schema, model } from 'mongoose';

interface IUser {
  email: string
  password: string
  isFake: boolean;
}

const schema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  isFake: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model<IUser>('User', schema);
