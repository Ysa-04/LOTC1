import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI || '');

let db: Db;

export async function connectDB(): Promise<Db> {
  if (!db) {
    await client.connect();
    db = client.db('lordofthecoders');
    console.log('Connected to MongoDB (native driver)');
  }
  return db;
}

export function getDB(): Db {
  if (!db) throw new Error('Database not connected. Call connectDB first.');
  return db;
} 
