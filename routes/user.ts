// routes/user.ts
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { getFavoritesByUserId, addFavorite, removeFavorite, countFavoritesByCharacter } from '../favorite-service';
import { getBlacklistsByUserId, addToBlacklist, removeFromBlacklist, updateBlacklistReason } from '../blacklist-service';

const router = express.Router();

function ensureLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user) return res.redirect('/login');
  next();
}

router.use(ensureLoggedIn);

router.get('/favorite', async (req, res) => { 
  const quotes = await getFavoritesByUserId(req.session.user.id);
  res.render('favorite', { quotes });
});

router.post('/favorite/add', async (req, res) => {
  const { quote, character, film } = req.body;
  await addFavorite(req.session.user.id, quote, character, film);
  res.redirect('/user/favorite');
});

router.post('/favorite/remove', async (req, res) => {
  await removeFavorite(req.session.user.id, req.body.quote);
  res.redirect('/user/favorite');
});

router.get('/blacklist', async (req, res) => {
  const blacklisted = await getBlacklistsByUserId(req.session.user.id);
  res.render('blacklist', { blacklisted });
});

router.post('/blacklist/add', async (req, res) => {
  const { quote, character, film, reason } = req.body;
  await addToBlacklist(req.session.user.id, quote, character, film, reason);
  res.redirect('/user/blacklist');
});

router.post('/blacklist/remove', async (req, res) => {
  await removeFromBlacklist(req.session.user.id, req.body.quote);
  res.redirect('/user/blacklist');
});

router.post('/blacklist/update', async (req, res) => {
  await updateBlacklistReason(req.session.user.id, req.body.quote, req.body.reason);
  res.redirect('/user/blacklist');
});

export default router;
