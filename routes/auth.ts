import express from 'express';
import bcrypt from 'bcrypt';
import { createUser, findUserByUsername, validateUserLogin } from '../user-service';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.render('login', { error: 'Ongeldige login.' });
  }

  req.session.user = { id: user._id, username: user.username };
  res.redirect('/homepage');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const existing = await findUserByUsername(username);
  if (existing) return res.render('register', { error: 'Gebruiker bestaat al.' });

  const passwordHash = await bcrypt.hash(password, 10);
  await createUser({ username, email, passwordHash });
  res.redirect('/login');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

export default router;
