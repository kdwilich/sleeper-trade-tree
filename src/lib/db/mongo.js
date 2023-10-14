import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';

const uri = process.env['MONGODB_URI'];

const client = new MongoClient(uri);

export function start_mongo() {
  console.log('Starting mongo...');
  return client.connect();
}

export default client.db(process.env['DB_NAME']);