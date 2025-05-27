import express from 'express';
import { verifyToken } from '../middleware/login';
import { startQuiz, answerQuiz } from '../controllers/quizControllers';

const router = express.Router();

router.get('/quiz/start', verifyToken, startQuiz);
router.post('/quiz/answer', verifyToken, answerQuiz);

export default router;