import mongoose from 'mongoose';
import Logger from '../helpers/Logger';

export default function databaseLoader() {
  mongoose
    .connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { Logger.applicationLogger('Connected to MongoDB') });
}
