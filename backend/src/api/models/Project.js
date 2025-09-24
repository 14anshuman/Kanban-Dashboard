import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default model('Project', ProjectSchema);
