import 'dotenv/config';
import chalk from 'chalk';
// import cors from 'cors';
// import graphqlHTTP from 'express-graphql';
// import mongoose from './config/mongoose';
// import { taskSchema } from './schema/task';
// const db = mongoose();
// const app = express();

// db.once('open', () => console.log('Connection established with MongoDB'));

// app.use('*', cors());

// app.use('/graphql', cors(), graphqlHTTP({
//   schema: taskSchema,
//   rootValue: global,
//   graphiql: true
// }));

// // Up and Running at Port 4000
// app.listen(process.env.PORT || 4000, () => {
//   console.log('A GraphQL API running at port 4000');
// });


import { app, apolloServer } from './app';
import connectToDb from './config/db';

connectToDb();

app.listen(process.env.PORT, () => {
  console.log(
    `\nApp started on ${chalk.cyan(`http://${process.env.HOST}:${process.env.PORT}${apolloServer.graphqlPath}`)}`
  );
});