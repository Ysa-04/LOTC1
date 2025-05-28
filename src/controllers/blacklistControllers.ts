import { getDb } from '../models/database';
import { Request, Response } from 'express';

export async function addBlacklist(req: Request, res: Response) {
  const { quote, character, reason } = req.body;
  await getDb().collection('users').updateOne(
    { _id: req.userId },
    { $push: { blacklist: { quote, character, reason } } }
  );
  res.sendStatus(200);
}

export async function getBlacklist(req: Request, res: Response) {
  const user = await getDb().collection('users').findOne({ _id: req.userId });
  const blacklist = user?.blacklist || [];
  res.render("blacklist", { blacklist });
}


export async function removeBlacklist(req: Request, res: Response) {
  const { quote } = req.body;
  await getDb().collection('users').updateOne(
    { _id: req.userId },
    { $pull: { blacklist: { quote } } }
  );
  res.sendStatus(200);
}

export async function updateBlacklist(req: Request, res: Response) {
  const { quote, reason } = req.body;
  await getDb().collection('users').updateOne(
    { _id: req.userId, 'blacklist.quote': quote },
    { $set: { 'blacklist.$.reason': reason } }
  );
  res.sendStatus(200);
}