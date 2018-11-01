import mongoose from 'mongoose'

const Schema = mongoose.Schema

const taskSchema = new Schema(
  {
    name: { type: String },
  },
  { collection: 'tasks' }
)

const Task = mongoose.model('Task', taskSchema)
export default Task;
