import { Request, Response } from 'express';

const API_BASE = 'https://the-one-api.dev/v2';
const API_TOKEN = 'BKTeUwx4IMAM8KVDo7b0'; // <-- vervang dit met jouw echte key

function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

async function apiFetch(endpoint: string) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { Authorization: API_TOKEN },
  });
  if (!res.ok) throw new Error(`API fout op ${endpoint}`);
  return res.json();
}

export async function startQuiz(req: any, res: Response): Promise<void> {
  try {
    if (!req.session.round) {
      req.session.round = 1;
      req.session.score = 0;
    }

    if (req.session.round > 10) {
      return res.render('quizResult', {
        score: req.session.score,
      });
    }

    const quotesRes: any = await apiFetch('/quote');
    const quote: any = shuffle(quotesRes.docs)[0];

    const characterRes: any = await apiFetch(`/character/${quote.character}`);
    const correctCharacter = characterRes.docs[0];

    const movieRes: any = await apiFetch(`/movie/${quote.movie}`);
    const correctMovie = movieRes.docs[0];

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

    res.render('quiz', {
      round: req.session.round,
      quote: quote.dialog,
      characterOptions,
      movieOptions,
      score: req.session.score,
    });
  } catch (err) {
    console.error(err);
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
