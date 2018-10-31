import config from './config';
import mongoose from 'mongoose';
const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];

const mongooseConnect = () => {
    mongoose.Promise = global.Promise;
    const db = mongoose.connect(configEnv.db, { useMongoClient: true });
    mongoose.connection.on('error', (err) => {
        console.log('Error: ', err);
    })
    return db;
};

export default mongooseConnect;
