import { db } from '../models/db';
import { Request, Response } from 'express';

export async function startQuiz(req: any, res: Response) {
  // Haal de gebruiker op uit de database
  const user = await db().collection('users').findOne({ _id: req.userId });
  if (!user) return res.status(404).send('User not found');

  // Haal quotes op en filter de blacklist van de gebruiker eruit
  const blacklistQuotes = user.blacklist?.map((item: any) => item.quote) || [];
  const allQuotes = await db().collection('quotes').find().toArray();
  const availableQuotes = allQuotes.filter((q: any) => !blacklistQuotes.includes(q.dialog));

  // Randomize en kies 10 quotes
  const quizQuotes = availableQuotes.sort(() => 0.5 - Math.random()).slice(0, 10);

  // Render quiz view met de geselecteerde quotes
  res.render('quiz', { quiz: quizQuotes });
}
