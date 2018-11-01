import TaskType from '../modules/task'

export default {
  Query: {
    ...TaskType.resolvers.Query,
  },
  Mutation: {
    ...TaskType.resolvers.Mutation,
  }
};