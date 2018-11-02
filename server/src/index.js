import 'dotenv/config';
import chalk from 'chalk';
import { app, apolloServer } from './app';
import connectToDb from './config/db';
import models from './models';

connectToDb();

const createUsersWithMessages = async date => {
  await models.User.deleteMany({});
  await models.Message.deleteMany({});

  // and rise again
  await new models.User({
    username: 'vadimnicolai',
    email: 'nicolai.vadim@gmail.com',
    password: 'vadimnicolai',
    role: 'ADMIN',
  }).save(async function (err, user) {
    if (err) {
      console.log(err);
    } else {
      await user.messages.push(
        await new models.Message({
          text: 'Another message',
          createdAt: date.setSeconds(date.getSeconds() + 1),
          user: user._id,
        }).save(),
      );
    }
  });

  await new models.User({
    username: 'vadim.nicolai',
    email: 'vadim.nicolai@atomate.net',
    password: 'vadim.nicolai',
  }).save(async function (err, user) {
    if (err) {
      console.log(err);
    } else {
      await user.messages.push(
        await new models.Message({
          text: 'Test message',
          createdAt: date.setSeconds(date.getSeconds() + 1),
          user: user._id,
        }).save(),
      );
    }
  });
};

createUsersWithMessages(new Date());


app.listen(process.env.PORT, () => {
  console.log(
    `\nApp started on ${chalk.cyan(`http://${process.env.HOST}:${process.env.PORT}${apolloServer.graphqlPath}`)}`
  );
});