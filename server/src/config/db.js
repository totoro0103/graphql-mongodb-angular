import mongoose from 'mongoose';
import chalk from 'chalk';

mongoose.Promise = global.Promise;

export default function connectToDb() {
  return mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log(`Connected to MongoDB: ${chalk.cyan(process.env.DB_URL)}`))
    .catch(err => console.log(`Error occured while connection was being made: ${chalk.red(err.message)}`));
};