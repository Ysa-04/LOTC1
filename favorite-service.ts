import { getDB } from './database';
import { ObjectId } from 'mongodb';

const favorites = () => getDB().collection('favorites');

export async function getFavoritesByUserId(userId: string) {
  return await favorites().find({ userId: new ObjectId(userId) }).toArray();
}

export async function addFavorite(userId: string, quote: string, character: string, film: string) {
  return await favorites().insertOne({ userId: new ObjectId(userId), quote, character, film });
}

export async function removeFavorite(userId: string, quote: string) {
  return await favorites().deleteOne({ userId: new ObjectId(userId), quote });
}

export async function countFavoritesByCharacter(userId: string) {
  return await favorites().aggregate([
    { $match: { userId: new ObjectId(userId) } },
    { $group: { _id: '$character', count: { $sum: 1 } } }
  ]).toArray();
}
