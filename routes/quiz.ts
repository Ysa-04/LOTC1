import express, {Express} from 'express';
import { addFavorite } from '../favorite-service';
import { addToBlacklist, getBlacklistsByUserId } from '../blacklist-service';
import { addHighscore } from '../highscore-service';

const router = express.Router();
const API_URL = 'https://the-one-api.dev/v2/quote';
const API_KEY = process.env.LOTR_API_KEY;

function ensureLoggedIn(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  next();
}

router.use(ensureLoggedIn);

// Example route to start quiz
router.get('/10-rounds', async (req, res) => {
  res.render('10-rounds');
});

router.get('/suddendeath', async (req, res) => {
  res.render('suddendeath');
});

// Fetch random quote (filtered against blacklist)
router.get('/quote', async (req, res) => {
  const response = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${API_KEY}` }
  });
  const data = await response.json();
  const blacklist = await getBlacklistsByUserId(req.session.user.id);
  const blacklistQuotes = blacklist.map(q => q.quote);

  const quote = data.docs.find(q => !blacklistQuotes.includes(q.dialog));
  res.json(quote);
});

// Add favorite
router.post('/favorite', async (req, res) => {
  const { quote, character, film } = req.body;
  await addFavorite(req.session.user.id, quote, character, film);
  res.sendStatus(200);
});

// Add blacklist
router.post('/blacklist', async (req, res) => {
  const { quote, character, film, reason } = req.body;
  await addToBlacklist(req.session.user.id, quote, character, film, reason);
  res.sendStatus(200);
});

// Submit score
router.post('/score', async (req, res) => {
  const { mode, score } = req.body;
  await addHighscore(req.session.user.id, mode, score);
  res.sendStatus(200);
});

export default router;
