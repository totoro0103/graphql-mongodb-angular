import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    task(name: String!): Task
    getAllTasks: [Task]
  }
  extend type Mutation {
    addTask(name: String): Task!
    updateTask(id: String, name: String): Task
    removeTask(id: String): Task
  }
  type Task {
    id: String
    name: String
  }
`