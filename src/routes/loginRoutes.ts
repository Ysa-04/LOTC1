
import express from 'express';
import { login, register } from '../controllers/loginControllers';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login'); 
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/login', login);
router.post('/register', register);

export default router;
