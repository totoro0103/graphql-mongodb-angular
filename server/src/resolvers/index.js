import TaskType from '../modules/task'

export default {
  Query: {
    hello: () => 'Hello world!',
    ...TaskType.resolvers,
  },
};