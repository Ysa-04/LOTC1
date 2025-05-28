import { Request, Response } from 'express';

const API_BASE = 'https://the-one-api.dev/v2';
const API_TOKEN = 'BKTeUwx4IMAM8KVDo7b0'; 

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
  console.log('Quiz gestart');
  console.log('Huidige sessie:', req.session);
  try {
    // Initialiseer sessie-waarden indien nodig
    if (!req.session.round) {
      req.session.round = 1;
      req.session.score = 0;
    }

    // Als 10 rondes voltooid zijn, toon het resultaat
    if (req.session.round > 10) {
      return res.render('quizResult', {
        score: req.session.score,
      });
    }

    // Haal quotes, karakters en films op
    const quotesRes: any = await apiFetch('/quote');
    const quote: any = shuffle(quotesRes.docs)[0];

    const characterRes: any = await apiFetch(`/character/${quote.character}`);
    const correctCharacter = characterRes.docs[0];

    const movieRes: any = await apiFetch(`/movie/${quote.movie}`);
    const correctMovie = movieRes.docs[0];

    const allCharactersRes: any = await apiFetch('/character');
    const allMoviesRes: any = await apiFetch('/movie');

    // Genereer antwoordopties
    const characterOptions = shuffle([
      correctCharacter,
      ...shuffle(allCharactersRes.docs.filter((c: any) => c._id !== correctCharacter._id)).slice(0, 3),
    ]);

    const movieOptions = shuffle([
      correctMovie,
      ...shuffle(allMoviesRes.docs.filter((m: any) => m._id !== correctMovie._id)).slice(0, 3),
    ]);

    // Sla juiste antwoorden op in sessie
    req.session.correctCharacter = correctCharacter._id;
    req.session.correctMovie = correctMovie._id;

    // Render quiz pagina
    res.render('10-rounds', {
      round: req.session.round,
      score: req.session.score,
      quote: quote.dialog,
      characterOptions,
      movieOptions,
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
