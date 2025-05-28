import { Request, Response } from 'express';
import { getDb } from '../models/database';

const API_BASE = 'https://the-one-api.dev/v2';
const API_TOKEN = 'BKTeUwx4IMAM8KVDo7b0'; 

function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

async function apiFetch(endpoint: string) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error('API response:', errorText);
    throw new Error(`API fout op ${endpoint}`);
  }
  return res.json();
}

export async function startQuiz(req: any, res: Response): Promise<void> {
  console.log('Quiz gestart');
  console.log('Huidige sessie:', req.session);
  try {
    if (!req.session.round) {
      req.session.round = 1;
      req.session.score = 0;
      console.log('Nieuwe quizsessie gestart');
    }

    if (req.session.round > 10) {
      console.log('Ronde voorbij, score:', req.session.score);
      return res.render('result', {
        score: req.session?.score ?? 0,
      });
    }

    console.log('Quotes ophalen...');
    const quotesRes: any = await apiFetch('/quote');
    const quote: any = shuffle(quotesRes.docs)[0];
    console.log('Quote geselecteerd:', quote.dialog);

    const characterRes: any = await apiFetch(`/character/${quote.character}`);
    const correctCharacter = characterRes.docs[0];
    console.log('Juiste karakter:', correctCharacter.name);

    const movieRes: any = await apiFetch(`/movie/${quote.movie}`);
    const correctMovie = movieRes.docs[0];
    console.log('Juiste film:', correctMovie.name);

    const allCharactersRes: any = await apiFetch('/character');
    const allMoviesRes: any = await apiFetch('/movie');

    const characterOptions = shuffle([
      correctCharacter,
      ...shuffle(allCharactersRes.docs.filter((c: any) => c._id !== correctCharacter._id)).slice(0, 3),
    ]);

    const movieOptions = shuffle([
      correctMovie,
      ...shuffle(allMoviesRes.docs.filter((m: any) => m._id !== correctMovie._id)).slice(0, 3),
    ]);

    req.session.correctCharacter = correctCharacter._id;
    req.session.correctMovie = correctMovie._id;

    console.log('Ronde', req.session.round, 'start met score', req.session.score);
    res.render('10-rounds', {
      round: req.session.round,
      score: req.session.score,
      quote: quote.dialog,
      characterOptions,
      movieOptions,
    });
  } catch (err) {
  console.error('Fout in startQuiz:', err);
  res.status(500).send('Quiz kon niet geladen worden');
}
}

export async function answerQuiz(req: any, res: Response): Promise<void> {
  const { selectedCharacter, selectedMovie } = req.body;
  const correctCharacter = req.session.correctCharacter;
  const correctMovie = req.session.correctMovie;

  const characterCorrect = selectedCharacter === correctCharacter;
  const movieCorrect = selectedMovie === correctMovie;

  if (characterCorrect && movieCorrect) {
    req.session.score += 1;
  } else if (characterCorrect || movieCorrect) {
    req.session.score += 0.5;
  }

  req.session.round++;
  res.redirect('/quiz/start');
}

//suddendeath
export async function startSuddenDeath(req: any, res: Response): Promise<void> {
  try {
    if (!req.session.sdScore) {
      req.session.sdScore = 0;
    }

    const quotesRes: any = await apiFetch('/quote');
    const quote: any = shuffle(quotesRes.docs)[0];

    const character = await apiFetch(`/character/${quote.character}`).then(r => r.docs[0]);
    const movie = await apiFetch(`/movie/${quote.movie}`).then(r => r.docs[0]);

    const allCharacters = await apiFetch('/character').then(r => r.docs);
    const allMovies = await apiFetch('/movie').then(r => r.docs);

    const characterOptions = shuffle([
      character,
      ...shuffle(allCharacters.filter((char: any) => char._id !== character._id)).slice(0, 3),
    ]);

    const movieOptions = shuffle([
      movie,
      ...shuffle(allMovies.filter((mov: any) => mov._id !== movie._id)).slice(0, 3),
    ]);

    req.session.sdCorrectCharacter = character._id;
    req.session.sdCorrectMovie = movie._id;

    res.render("sudden-death", {
      score: req.session.sdScore,
      quote: quote.dialog,
      characterOptions,
      movieOptions,
    });
  } catch (err) {
    console.error("Fout in startSuddenDeath:", err);
    res.status(500).send("Sudden Death kon niet gestart worden.");
  }
}

export async function answerSuddenDeath(req: any, res: Response): Promise<void> {
  try {
    const { selectedCharacter, selectedMovie } = req.body;
    const correctCharacter = req.session.sdCorrectCharacter;
    const correctMovie = req.session.sdCorrectMovie;

    const isCorrect = selectedCharacter === correctCharacter && selectedMovie === correctMovie;

    if (isCorrect) {
      req.session.sdScore += 1;
      return res.redirect("/quiz/suddendeath");
    }

    const db = getDb();
    const user = await db.collection("users").findOne({ _id: req.userId });

    const previousHigh = user?.suddenHighScore || 0;
    const finalScore = req.session.sdScore;
    const newHigh = Math.max(previousHigh, finalScore);

    await db.collection("users").updateOne(
      { _id: req.userId },
      { $set: { suddenHighScore: newHigh } }
    );

    req.session.sdScore = 0;

    res.render("sudden-death-result", {
      score: finalScore,
      highScore: newHigh
    });
  } catch (err) {
    console.error("Fout in answerSuddenDeath:", err);
    res.status(500).send("Sudden Death antwoordverwerking mislukt.");
  }
}
