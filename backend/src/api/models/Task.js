import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Enums can just be plain JS objects
export const TaskStatus = {
  ToDo: 'todo',
  InProgress: 'inprogress',
  Done: 'done',
};

export const TaskPriority = {
  Low: 'low',
  Medium: 'medium',
  High: 'high',
};

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.ToDo,
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.Medium,
    },
    deadline: { type: Date, required: true },
    project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  },
  { timestamps: true }
);

export default model('Task', TaskSchema);
