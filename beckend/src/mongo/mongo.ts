import mongoose from 'mongoose';
import config from '../config/config';

/**
 * Connect to mongo
 */
export default async function connectToMongo() {
  await mongoose.connect(config.mongoDbPath);
};
