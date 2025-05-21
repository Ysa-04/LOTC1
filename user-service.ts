import { getDB } from './database';
import { ObjectId } from 'mongodb';

const users = () => getDB().collection('users');

export async function findUserByUsername(username: string) {
  return await users().findOne({ username });
}

export async function findUserById(id: string) {
  return await users().findOne({ _id: new ObjectId(id) });
}

export async function createUser(data: { username: string, email: string, passwordHash: string }) {
  return await users().insertOne(data);
} 

export async function validateUserLogin(username: string, passwordHash: string) {
  return await users().findOne({ username, passwordHash });
}
