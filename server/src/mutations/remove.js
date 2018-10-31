import { GraphQLNonNull, GraphQLString } from 'graphql';
import { taskType } from '../types/task';
import TaskModel from '../models/task';

export const remove = {
  type: taskType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removedtask = TaskModel.findByIdAndRemove(params.id).exec();
    if (!removedtask) {
      throw new Error('Error')
    }
    return removedtask;
  }
}
