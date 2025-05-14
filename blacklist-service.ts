import { getDB } from './database';
import { ObjectId } from 'mongodb';

const blacklists = () => getDB().collection('blacklists');

export async function getBlacklistsByUserId(userId: string) {
  return await blacklists().find({ userId: new ObjectId(userId) }).toArray();
}

export async function addToBlacklist(userId: string, quote: string, character: string, film: string, reason: string) {
  return await blacklists().insertOne({ userId: new ObjectId(userId), quote, character, film, reason });
}

export async function removeFromBlacklist(userId: string, quote: string) {
  return await blacklists().deleteOne({ userId: new ObjectId(userId), quote });
}

export async function updateBlacklistReason(userId: string, quote: string, newReason: string) {
  return await blacklists().updateOne(
    { userId: new ObjectId(userId), quote },
    { $set: { reason: newReason } }
  );
}
