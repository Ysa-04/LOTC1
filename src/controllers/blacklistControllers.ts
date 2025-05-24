import { db } from '../models/db';
import { Request, Response } from 'express';

export async function addBlacklist(req: Request, res: Response) {
  const { quote, character, reason } = req.body;
  await db().collection('users').updateOne(
    { _id: req.userId },
    { $push: { blacklist: { quote, character, reason } } }
  );
  res.sendStatus(200);
}

export async function getBlacklist(req: Request, res: Response) {
  const user = await db().collection('users').findOne({ _id: req.userId });
  res.json(user.blacklist || []);
}

export async function removeBlacklist(req: Request, res: Response) {
  const { quote } = req.body;
  await db().collection('users').updateOne(
    { _id: req.userId },
    { $pull: { blacklist: { quote } } }
  );
  res.sendStatus(200);
}

export async function updateBlacklist(req: Request, res: Response) {
  const { quote, reason } = req.body;
  await db().collection('users').updateOne(
    { _id: req.userId, 'blacklist.quote': quote },
    { $set: { 'blacklist.$.reason': reason } }
  );
  res.sendStatus(200);
}