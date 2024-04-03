import { Schema, model } from 'mongoose';

interface ILastUsed {
  users: Array<String>;
}

const schema = new Schema<ILastUsed>({
  users: {
    type: Array,
    required: true,
  },
});

export default model<ILastUsed>('LastUsed', schema);
