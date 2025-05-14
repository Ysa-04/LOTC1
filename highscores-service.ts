import { getDB } from './database';
import { ObjectId } from 'mongodb';

const highscores = () => getDB().collection('highscores');

export async function addHighscore(userId: string, mode: '10-rounds' | 'suddendeath', score: number) {
  return await highscores().insertOne({ userId: new ObjectId(userId), mode, score, date: new Date() });
}

export async function getHighscoresByMode(mode: '10-rounds' | 'suddendeath') {
  return await highscores().find({ mode }).sort({ score: -1 }).limit(10).toArray();
}

export async function getUserHighscore(userId: string, mode: '10-rounds' | 'suddendeath') {
  return await highscores()
    .find({ userId: new ObjectId(userId), mode })
    .sort({ score: -1 })
    .limit(1)
    .toArray();
}
