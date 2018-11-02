import express from 'express';
import morgan from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import resolvers from './resolvers';
import models from './models';

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: () => ({ models })
});
const app = express();

app.use(morgan('dev'));
apolloServer.applyMiddleware({ app });

export {
  app,
  apolloServer,
};