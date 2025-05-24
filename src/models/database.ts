import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI || '');
let database: any;

export async function connectToDb() {
  await client.connect();
  database = client.db('lotr');
}

export function db() {
  return database;
}