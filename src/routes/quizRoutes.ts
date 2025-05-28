import express from 'express';
import { verifyToken } from '../middleware/login';
import { startQuiz, answerQuiz, startSuddenDeath, answerSuddenDeath } from '../controllers/quizControllers';

const router = express.Router();

router.get('/start', verifyToken, startQuiz);
router.post('/answer', verifyToken, answerQuiz);

router.get('/quiz/suddendeath', verifyToken, startSuddenDeath);
router.post('/quiz/suddendeath/answer', verifyToken, answerSuddenDeath);


export default router;
