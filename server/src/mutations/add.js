import { GraphQLNonNull, GraphQLString } from 'graphql';
import { taskType } from '../types/task';
import TaskModel from '../models/task';

export const add = {
  type: taskType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, args) {
    const uModel = new TaskModel(args);
    const newTask = uModel.save();
    if (!newTask) {
      throw new Error('Error');
    }
    return newTask
  }
}