
import express from 'express';
import { login, register } from '../controllers/loginControllers';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login'); // toont login.ejs
});

router.get('/register', (req, res) => {
  res.render('register'); // toont login.ejs
});

router.post('/login', login);
router.post('/register', register);

export default router;
