import { GraphQLObjectType, GraphQLList } from 'graphql';
import TaskModel from '../models/task';
import { taskType } from '../types/task';

// Query
export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      tasks: {
        type: new GraphQLList(taskType),
        resolve: function () {
          const tasks = TaskModel.find().exec()
          if (!tasks) {
            throw new Error('Error')
          }
          return tasks
        }
      }
    }
  }
});

