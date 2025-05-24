import { db } from '../models/db';
import { Request, Response } from 'express';

let currentScore: number = 0;

export async function startQuiz(req: any, res: Response) {
  const user = await db().collection('users').findOne({ _id: req.userId });
  if (!user) return res.status(404).send('User not found');

  const blacklistQuotes = user.blacklist?.map((item: any) => item.quote) || [];
  const allQuotes = await db().collection('quotes').find().toArray();
  const availableQuotes = allQuotes.filter((q: any) => !blacklistQuotes.includes(q.dialog));
  const quizQuotes = availableQuotes.sort(() => 0.5 - Math.random()).slice(0, 10);

  res.render('quiz', { quiz: quizQuotes, score: 0 });
}

export async function answerQuiz(req: any, res: Response) {
  const { answer, correctCharacter, correctMovie } = req.body;
  const user = await db().collection('users').findOne({ _id: req.userId });

  let score = 0;
  if (answer.character === correctCharacter && answer.movie === correctMovie) score = 1;
  else if (answer.character === correctCharacter || answer.movie === correctMovie) score = 0.5;

  currentScore += score;

  if (req.body.end) {
    await db().collection('users').updateOne(
      { _id: req.userId },
      { $set: { highscore: Math.max(user.highscore || 0, currentScore) } }
    );
    const finalScore = currentScore;
    currentScore = 0;
    return res.render('result', { score: finalScore, highscore: user.highscore });
  }

  res.send({ message: 'Answer received', score: currentScore });
}