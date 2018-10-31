import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const Model = mongoose.model('Task', taskSchema);
export default Model;
