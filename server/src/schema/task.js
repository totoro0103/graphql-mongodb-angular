import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { queryType } from '../queries/task';
import mutation from '../mutations';

export const taskSchema = new GraphQLSchema({
  query: queryType,
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutation
  })
});
