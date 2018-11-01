import express from 'express';
import morgan from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './types/typeDefs';
import resolvers from './resolvers';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});
const app = express();

app.use(morgan('dev'));
apolloServer.applyMiddleware({ app });

export {
  app,
  apolloServer,
};