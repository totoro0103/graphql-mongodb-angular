import 'dotenv/config';
import chalk from 'chalk';
import { app, apolloServer } from './app';
import connectToDb from './config/db';

connectToDb();

app.listen(process.env.PORT, () => {
  console.log(
    `\nApp started on ${chalk.cyan(`http://${process.env.HOST}:${process.env.PORT}${apolloServer.graphqlPath}`)}`
  );
});