import { gql } from 'apollo-server-express';
import TaskType from '../modules/task/TaskType'

const typeDef = gql`
  type Query {
    hello: String
    task(name: String!): Task
    getAllTasks: [Task]
  }
`;

const typeDefs = [typeDef, TaskType.typeDefs]

export default typeDefs;