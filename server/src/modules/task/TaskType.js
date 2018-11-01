import TaskModel from './TaskModel'

export const typeDefs = `
  type Task {
    id: String
    name: String
  }
`

export const resolvers = {
  getAllTasks: async () => {
    const tasks = await TaskModel.find();
    return tasks;
  },
  task: (parent, arg) => {
    return { name: arg.name }
  }
}

export default {
  typeDefs,
  resolvers
}