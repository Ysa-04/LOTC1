import { db } from '../models/database';
import { Request, Response } from 'express';

export async function addFavorite(req: Request, res: Response) {
  const { quote, character } = req.body;
  await db().collection('users').updateOne(
    { _id: req.userId },
    { $push: { favorites: { quote, character } } }
  );
  res.sendStatus(200);
}

export async function getFavorites(req: Request, res: Response) {
  const user = await db().collection('users').findOne({ _id: req.userId });
  res.json(user.favorites || []);
}

export async function removeFavorite(req: Request, res: Response) {
  const { quote } = req.body;
  await db().collection('users').updateOne(
    { _id: req.userId },
    { $pull: { favorites: { quote } } }
  );
  res.sendStatus(200);
}