import { Schema, model } from 'mongoose';

interface IComment {
  comment: string
}

const schema = new Schema<IComment>({
  comment: {
    type: String,
    required: true,
  },
});

export default model<IComment>('Comment', schema);
