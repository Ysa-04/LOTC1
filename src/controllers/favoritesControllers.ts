import { getDb } from '../models/database';
import { Request, Response } from 'express';

export async function addFavorite(req: Request, res: Response) {
  const { quote, character } = req.body;
  await getDb().collection('users').updateOne(
    { _id: req.userId },
    { $push: { favorites: { quote, character } } }
  );
  res.sendStatus(200);
}

export async function getFavorites(req: Request, res: Response) {
  const user = await getDb().collection('users').findOne({ _id: req.userId });

  const favorites = user?.favorites || [];

  // Groepeer quotes per karakter
  const grouped = favorites.reduce((acc: any, item: any) => {
    const char = item.character;
    acc[char] = acc[char] || [];
    acc[char].push(item.quote);
    return acc;
  }, {});

  res.render("favorite", {
    favorites,
    grouped,
  });
}


export async function removeFavorite(req: Request, res: Response) {
  const { quote } = req.body;
  await getDb().collection('users').updateOne(
    { _id: req.userId },
    { $pull: { favorites: { quote } } }
  );
  res.sendStatus(200);
}