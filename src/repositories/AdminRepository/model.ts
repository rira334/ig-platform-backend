import { Schema, model } from 'mongoose';

interface IAdmin {
  email: string
  password: string
  url: string
}

const schema = new Schema<IAdmin>({
  url: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: Object,
    required: true,
  },
});

export default model<IAdmin>('Admin', schema);
